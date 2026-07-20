import { useCallback, useEffect, useRef } from 'react';

export function useDebounceCallback<T extends (...args: any[]) => any>(callback: T, delay: number) {
  const callbackRef = useRef(callback);
  let handler: ReturnType<typeof setTimeout> | undefined;

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback(
    (...args: Parameters<T>) => {
      clearTimeout(handler);

      handler = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);

      return () => clearTimeout(handler);
    },
    [delay],
  );
}
