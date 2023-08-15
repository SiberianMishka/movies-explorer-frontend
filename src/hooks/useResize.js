import { useEffect, useState } from 'react';

// Функция задержки
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
};

// Отслеживаем размер окна браузера
const useResize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const getSize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = debounce(getSize, 10); // Задержка в 10 мс
    handleResize();

    window.addEventListener('resize', handleResize);

    // Удаляем слушатель
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};

export default useResize;
