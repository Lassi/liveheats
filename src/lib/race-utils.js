import { v4 } from 'uuid';

import { readData, writeData } from '@/lib/storage-utils';

export const createRace = (raceName, studentNames) => {
  const newRace = {
    id: v4(),
    name: raceName,
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

  const completedRaces = allRaces.filter(isCompleted);
  const liveRaces = allRaces.filter(isLive);

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

  return updatedRaces.find(race => race.id === raceId);
};

export const isCompleted = (race) => {
  return race.students.every(
    (student) => student.rank != null
  );
};

export const isLive = (race) => {
  return race.students.every(
    (student) => student.rank == null
  );
};
