export const LOCALSTORAGE_KEY = 'liveheats-races';

export const readData = () => {
  try {
    const data = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
};

export const writeData = (jsonData) => {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(jsonData));
};

export const clearData = () => {
  localStorage.removeItem(LOCALSTORAGE_KEY);
};
