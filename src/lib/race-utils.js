import { v4 } from 'uuid';

import { readData, writeData } from '@/lib/storage-utils';

export const createRace = (studentNames) => {
  const newRace = {
    id: v4(),
    students: studentNames.map((name) => ({
      name,
      rank: null,
    })),
  };

  const existingRaces = readData();

  writeData([...existingRaces, newRace]);

  return newRace;
};

export const listRaces = () => {
  const allRaces = readData();

  const completedRaces = allRaces.filter((race) => race.students.every(
    (student) => student.rank != null
  ));
  const liveRaces = allRaces.filter((race) => race.students.every(
    (student) => student.rank == null
  ));

  return ({
    completedRaces, 
    liveRaces,
  });
};

export const getRace = (raceId) => {
  const allRaces = readData();

  return allRaces.find(race => race.id === raceId) ?? null;
};

export const completeRace = (raceId, studentRanks) => {
  const allRaces = readData();
  const updatedRaces = allRaces.map((race) => {
    if (race.id !== raceId) {
      return race;
    }
    
    return ({
      ...race,
      students: race.students.map(({ name }, index) => ({
        name,
        rank: studentRanks.at(index),
      })),
    });
  });

  writeData(updatedRaces);
};
