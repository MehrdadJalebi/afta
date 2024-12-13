import { useEffect, useMemo, useState } from 'react';

export function useTimer(defaultTimer = 120) {
  const [timer, setTimer] = useState(defaultTimer);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const resetTimer = (newTimer = defaultTimer) => {
    setTimer(newTimer);
  };

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, [timer]);

  return {
    timer,
    resetTimer,
    formattedTime,
  };
}
