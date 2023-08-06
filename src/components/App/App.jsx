import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import PageNotFound from '../PageNotFound/PageNotFound';
import { useState, useEffect } from 'react';
import { moviesApi } from '../../utils/MoviesApi';

function App() {
  const location = useLocation();
  const isLoggedIn = location.pathname === '/' ? false : true;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    moviesApi
      .getMovies()
      .then((movies) => {
        localStorage.setItem('movies', JSON.stringify(movies));
        setMovies(movies);
        // console.log(movies);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // console.log(localStorage.getItem('movies'))
  console.log(movies);

  return (
    <div className="App"> {/* TODO: вынести пути, в футере тоже */}
      {location.pathname === '/' ||
      location.pathname === '/movies' ||
      location.pathname === '/saved-movies' ||
      location.pathname === '/profile' ? (
        <Header isLoggedIn={isLoggedIn} />
      ) : (
        ''
      )}
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      {location.pathname === '/' ||
      location.pathname === '/movies' ||
      location.pathname === '/saved-movies' ? (
        <Footer />
      ) : (
        ''
      )}
    </div>
  );
}

export default App;
