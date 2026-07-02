export const removeItem = (key: string): void => {
  return localStorage.removeItem(key);
};

export const setItem = <T>(key: string, item: T): void => {
  return localStorage.setItem(key, JSON.stringify(item));
};

export const getItem = <T>(key: string): T | string | null => {
  const item = localStorage.getItem(key);
  if (item === null) return null;
  try {
    return JSON.parse(item) as T;
  } catch {
    return item; // return raw string if it's not valid JSON
  }
};

export const clearStorage = (): void => {
  return localStorage.clear();
};
