import { useEffect, useState } from 'react';

// отслеживаем размер окна браузера
const useResize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const getSize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });

    getSize();

    window.addEventListener('resize', getSize);

    //удаляем слушатель
    return () => window.removeEventListener('resize', getSize);
  }, []);
  // console.log(size);
  return size;
};

export default useResize;
