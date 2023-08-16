// Библиотечные импорты
import { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
// Стили
import './App.css';
// Утилиты и константы
import { auth } from '../../utils/Auth';
import MainApi from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import { BASE_URL } from '../../utils/constants';
// Контексты
import { CurrentUserContext } from '../../context/CurrentUserContext';
// Компоненты
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Preloader/Preloader';

function App() {
  let location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProfileOk, setIsProfileOk] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [serverError, setServerError] = useState({
    login: {},
    register: {},
    profile: {},
    movies: {},
  });
  // Константы путей для проверки отображения Header и Footer
  const headerDisplayRoutes = ['/', '/movies', '/saved-movies', '/profile'];
  const footerDisplayRoutes = ['/', '/movies', '/saved-movies'];

  const mainApi = new MainApi({
    url: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  });

  // Сброс ошибок API при изменении location
  useEffect(() => {
    setServerError({
      login: {},
      register: {},
      profile: {},
    });
  }, [location]);

  // Проверяем JWT токен
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            // При успехе
            setIsLoggedIn(true);
            navigate(location.pathname);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          // При несовпадении токена удаляем его в localstorage и отключаем Preloader
          if (error.status === 401) {
            localStorage.removeItem('jwt');
            setIsLoading(false);
          }
          console.log(error);
        });
    } else {
      // При отсутствии токена отключаем Preloader
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Получение информации о пользователе при isLoggedIn
  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getUserInfo()
        .then(setCurrentUser)
        .catch((error) => {
          console.log(`Ошибка: ${error}`);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  // Получение списка фильмов при isLoggedIn из localStorage или через moviesApi.
  useEffect(() => {
    if (isLoggedIn) {
      const savedMovies = localStorage.getItem('movies');

      if (savedMovies) {
        const parsedMovies = JSON.parse(savedMovies);
        setMovies(parsedMovies);
        // const imageURLs = parsedMovies.map(movie => movie.image.url);
        // console.log(imageURLs[0]);
      } else {
        moviesApi
          .getMovies()
          .then((movies) => {
            localStorage.setItem('movies', JSON.stringify(movies));
            setMovies(movies);
            setServerError({ ...serverError, movies: {} });
          })
          .catch((error) => {
            setServerError({ ...serverError, movies: error });
            console.log(error);
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  // Получение сохраненных фильмов при isLoggedIn
  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getSavedMovies()
        .then((data) => {
          setSavedMovies(data);
          localStorage.setItem('savedMovies', JSON.stringify(data));
        })
        .catch(console.log);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  // При изменении savedMovies сохраняем их в localStorage
  useEffect(() => {
    isLoggedIn &&
      localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }, [savedMovies, isLoggedIn]);

  // Регистрация пользователя
  const handleRegister = (values) => {
    setIsSubmitting(true);
    setTimeout(() => {
      auth
        .register(values.name, values.email, values.password)
        .then((res) => {
          handleLogin(values);
        })
        .catch((error) => {
          setIsProfileOk(false);
          setServerError({ ...serverError, register: error });
          console.log(error);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }, 3000);
  };

  // Авторизация пользователя
  const handleLogin = (values) => {
    setIsSubmitting(true);
    auth
      .authorize(values.email, values.password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setIsLoggedIn(true);
          navigate('/movies');
        }
      })
      .catch((error) => {
        setIsProfileOk(false);
        setServerError({ ...serverError, login: error });
        console.log(error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // Редактирование данных пользователя
  const handleUpdateUser = (user) => {
    setIsSubmitting(true);
    mainApi
      .updateUserInfo(user)
      .then(() => {
        setServerError({ ...serverError, profile: {} });
        setCurrentUser({
          ...currentUser,
          name: user.name,
          email: user.email,
        });
        setIsProfileOk(true);
      })
      .catch((error) => {
        setIsProfileOk(false);
        setServerError({ ...serverError, profile: error });
        console.log(error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // Выход из системы
  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    navigate('/');
  };

  // Сохранение фильма
  const handleLikeMovie = (movie, isLiked, id) => {
    if (isLiked) {
      handleDeleteMovie(id);
    } else {
      mainApi
        .saveMovie(movie)
        .then((res) => {
          setSavedMovies([...savedMovies, res]);
        })
        .catch((error) => console.log(error));
    }
  };

  // Удаление из сохраненных фильмов
  const handleDeleteMovie = (id) => {
    const localSavedMovies = JSON.parse(
      localStorage.getItem('localSavedMovies')
    );

    mainApi
      .deleteMovie(id)
      .then((res) => {
        const newSavedMovies = savedMovies.filter((movie) => movie._id !== id);
        setSavedMovies(newSavedMovies);

        if (localSavedMovies) {
          const newLocalSavedMovies = localSavedMovies.filter(
            (movie) => movie._id !== id
          );

          localStorage.setItem(
            'localSavedMovies',
            JSON.stringify(newLocalSavedMovies)
          );
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      {isLoading ? (
        <Preloader />
      ) : (
        <CurrentUserContext.Provider value={{ currentUser }}>
          {headerDisplayRoutes.includes(location.pathname) && (
            <Header isLoggedIn={isLoggedIn} />
          )}
          <main>
            <Routes>
              <Route path="/" element={<Main />} />

              <Route
                path="/signup"
                element={
                  <Register
                    onRegister={handleRegister}
                    isLoggedIn={isLoggedIn}
                    serverError={serverError}
                    isSubmitting={isSubmitting}
                  />
                }
              />

              <Route
                path="/signin"
                element={
                  <Login
                    onLogin={handleLogin}
                    isLoggedIn={isLoggedIn}
                    serverError={serverError}
                    isSubmitting={isSubmitting}
                  />
                }
              />

              <Route
                path="/movies"
                element={
                  <ProtectedRoute
                    element={Movies}
                    isLoggedIn={isLoggedIn}
                    movies={movies}
                    savedMovies={savedMovies}
                    onLikeMovie={handleLikeMovie}
                    serverError={serverError}
                  />
                }
              />

              <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute
                    element={SavedMovies}
                    isLoggedIn={isLoggedIn}
                    savedMovies={savedMovies}
                    onDeleteMovie={handleDeleteMovie}
                  />
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    element={Profile}
                    isLoggedIn={isLoggedIn}
                    isProfileOk={isProfileOk}
                    onSignOut={handleSignOut}
                    onUpdateUser={handleUpdateUser}
                    serverError={serverError}
                    isSubmitting={isSubmitting}
                  />
                }
              />

              <Route
                path="*"
                element={<PageNotFound isLoggedIn={isLoggedIn} />}
              />
            </Routes>
          </main>
          {footerDisplayRoutes.includes(location.pathname) && <Footer />}
        </CurrentUserContext.Provider>
      )}
    </div>
  );
}

export default App;
