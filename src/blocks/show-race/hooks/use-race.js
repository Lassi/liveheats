import { LOCALSTORAGE_KEY } from '@/lib/constants';

export const useRace = (raceId) => {
  try {
    const data = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    const races = Array.isArray(data) ? data : [];

    const race = races.find((race) => race.id === raceId);
    return race ? race : null;
  } catch (error) {
    return null;
  }
};
