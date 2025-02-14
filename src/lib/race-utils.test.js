import {
  clearData,
  readData,
  writeData,
} from '@/lib/storage-utils';

import {
  completeRace,
  createRace,
  getRace,
  isCompleted,
  isLive,
  listRaces,
} from './race-utils';

describe('race-utils', () => {
  beforeAll(() => {
    clearData();
  });

  afterEach(() => {
    clearData();
  });

  describe('createRace', () => {
    it('should create a new race and commit it to storage', () => {
      createRace(['Mathilda', 'Maria', 'Juan']);

      expect(readData()).toMatchObject([
        {
          students: [
            { name: 'Mathilda', rank: null },
            { name: 'Maria', rank: null },
            { name: 'Juan', rank: null },
          ],
        },
      ]);
    });

    it('should not overwrite existing races', () => {
      createRace(['Mathilda', 'Maria', 'Juan']);
      createRace(['Nick', 'Pascal', 'Jane']);

      expect(readData()).toMatchObject([
        {
          students: [
            { name: 'Mathilda', rank: null },
            { name: 'Maria', rank: null },
            { name: 'Juan', rank: null },
          ],
        },
        {
          students: [
            { name: 'Nick', rank: null },
            { name: 'Pascal', rank: null },
            { name: 'Jane', rank: null },
          ],
        },
      ]);
    });

    it('should return the newly created race', () => {
      const newRace = createRace(['Mathilda', 'Maria', 'Juan']);

      expect(newRace).toMatchObject({
        students: [
          { name: 'Mathilda', rank: null },
          { name: 'Maria', rank: null },
          { name: 'Juan', rank: null },
        ],
      });
    });
  });

  describe('listRaces', () => {
    const completedRace = {
      id: 'fake-race-id-1',
      students: [
        { name: 'Blair', rank: 1 },
        { name: 'Carol', rank: 2 },
      ],
    };
    const liveRace = {
      id: 'fake-race-id-2',
      students: [
        { name: 'Gizmo', rank: null },
        { name: 'Bill', rank: null },
      ],
    };
    const races = [completedRace, liveRace];

    it('should return all the completed races in storage', () => {
      writeData(races);

      expect(listRaces()).toMatchObject({ completedRaces: [completedRace] });
    });

    it('should return all the live races in storage', () => {
      writeData(races);

      expect(listRaces()).toMatchObject({ liveRaces: [liveRace] });
    });
  });

  describe('getRace', () => {
    const race1 = {
      id: 'fake-race-id-1',
      students: [
        { name: 'Blair', rank: 1 },
        { name: 'Carol', rank: 2 },
      ],
    };
    const race2 = {
      id: 'fake-race-id-2',
      students: [
        { name: 'Gizmo', rank: null },
        { name: 'Bill', rank: null },
      ],
    };
    const race3 = {
      id: 'fake-race-id-2',
      students: [
        { name: 'Greg', rank: null },
        { name: 'Phil', rank: null },
      ],
    };

    it('should return the race with matching id', () => {
      writeData([race1, race2, race3]);

      expect(getRace(race1.id)).toEqual(race1);
    });

    it('should return null if the race cannot be found', () => {
      expect(getRace('crazy-fake-id')).toBeNull();
    });
  });

  describe('completeRace', () => {
    const race1 = {
      id: 'fake-race-id-1',
      students: [
        { name: 'Gizmo', rank: null },
        { name: 'Bill', rank: null },
      ],
    };
    const race2 = {
      id: 'fake-race-id-2',
      students: [
        { name: 'Greg', rank: null },
        { name: 'Phil', rank: null },
      ],
    };

    it('should update the race with the rank of each student', () => {
      writeData([race1, race2]);

      completeRace(race2.id, [2, 1]);

      const updatedRace = readData().find(race => race.id === race2.id);
      expect(updatedRace.students).toMatchObject([
        { name: 'Greg', rank: 2 },
        { name: 'Phil', rank: 1 },
      ]);
    });

    it('should return the updated race', () => {
      writeData([race1, race2]);

      const completedRace = completeRace(race2.id, [2, 1]);

      expect(completedRace.students).toMatchObject([
        { name: 'Greg', rank: 2 },
        { name: 'Phil', rank: 1 },
      ]);
    });
  });

  describe('isCompleted', () => {
    it('should return false if the race has not been completed', () => {
      const race = createRace(['Milly', 'Socks']);

      expect(isCompleted(race)).toEqual(false);
    });

    it('should return true if the race has been completed', () => {
      const race = createRace(['Milly', 'Socks']);
      completeRace(race.id, [2, 1]);

      expect(isCompleted(getRace(race.id))).toEqual(true);
    });
  });

  describe('isLive', () => {
    it('should return false if the race has been completed', () => {
      const race = createRace(['Paloma', 'Kevin']);
      completeRace(race.id, [1, 2]);

      expect(isLive(getRace(race.id))).toEqual(false);
    });

    it('should return false if the race has not been completed', () => {
      const race = createRace(['Paloma', 'Kevin']);

      expect(isLive(race)).toEqual(true);
    });
  });
});
