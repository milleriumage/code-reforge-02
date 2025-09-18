import { useState, useEffect } from 'react';

export const useAutoLock = (timeout: number = 30000) => {
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsLocked(true);
      }, timeout);
    };

    const handleActivity = () => {
      if (isLocked) {
        setIsLocked(false);
      }
      resetTimer();
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('click', handleActivity);

    resetTimer();

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('click', handleActivity);
    };
  }, [timeout, isLocked]);

  return { isLocked, unlock: () => setIsLocked(false) };
};