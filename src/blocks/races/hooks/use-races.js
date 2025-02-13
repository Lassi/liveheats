import { LOCALSTORAGE_KEY } from '@/lib/constants';

export const useRaces = () => {
  try {
    const data = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    const races = Array.isArray(data) ? data : [];

    const liveRaces = races.filter((race) => race.students.every(
      (student) => student.rank == null
    ));
    const completedRaces = races.filter((race) => race.students.every(
      (student) => student.rank != null
    ));

    return { liveRaces, completedRaces };
  } catch (error) {
    return { liveRaces: [], completedRaces: [] };
  }
};
