import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';

type SetValue<T> = Dispatch<SetStateAction<T>>;

const parseJSON = <T>(value: string | null): T | undefined => {
  try {
    if (!value) {
      return undefined;
    }
    return JSON.parse(value);
  } catch {
    console.log('parsing error on', { value });
    return undefined;
  }
};

const useLocalStorage = <T>(key: string, value: T): [T, SetValue<T>] => {
  const readValue = useCallback((): T => {
    if (!window) {
      return value;
    }

    try {
      const item = window.localStorage.getItem(key);
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return item ? (parseJSON(item) as T) : value;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return value;
    }
  }, [value, key]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = useCallback(
    newValue => {
      try {
        const valueToSet = newValue ?? value;
        window.localStorage.setItem(key, JSON.stringify(valueToSet));
        setStoredValue(valueToSet);
        window.dispatchEvent(new Event('local-storage'));
      } catch {
        console.error(`Can not save ${key} `);
      }
    },
    [value, key],
  );

  const handleStorageChange = useCallback(() => {
    setStoredValue(readValue());
  }, [readValue]);

  // we need this useEffect to trigger dispatchEvent of local storage changes
  useEffect(() => {
    window.addEventListener('local-storage', handleStorageChange);
    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('local-storage', handleStorageChange);
    };
  }, [handleStorageChange]);

  return [storedValue, setValue];
};

export default useLocalStorage;
