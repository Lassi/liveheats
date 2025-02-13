import { renderHook } from '@testing-library/react';

import { LOCALSTORAGE_KEY } from '@/lib/constants';

import { useRaces } from './use-races';

describe('useRaces', () => {
  beforeAll(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should return empty arrays if the localStorage is empty', () => {
    const { result } = renderHook(() => useRaces());

    expect(result.current.liveRaces).toHaveLength(0);
    expect(result.current.completedRaces).toHaveLength(0);
  });

  it('should return races with no students ranked as live races', () => {
    const liveRace = {
      id: 'fake-live-id',
      name: 'Fake live name',
      students: [
        {
          name: 'fake-student-1',
          rank: null,
        },
        {
          name: 'fake-student-2',
          rank: null,
        },
        {
          name: 'fake-student-3',
          rank: null,
        },
      ],
    };
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify([liveRace]));

    const { result } = renderHook(() => useRaces());

    expect(result.current.liveRaces).toHaveLength(1);
    expect(result.current.completedRaces).toHaveLength(0);
    expect(result.current.liveRaces).toContainEqual(liveRace);
  });

  it('should return races with all students ranked as completed races', () => {
    const completedRace = {
      id: 'fake-completed-id',
      name: 'Fake completed race',
      students: [
        {
          name: 'fake-student-1',
          rank: 3,
        },
        {
          name: 'fake-student-2',
          rank: 1,
        },
        {
          name: 'fake-student-3',
          rank: 2,
        },
      ],
    };
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify([completedRace]));

    const { result } = renderHook(() => useRaces());

    expect(result.current.liveRaces).toHaveLength(0);
    expect(result.current.completedRaces).toHaveLength(1);
    expect(result.current.completedRaces).toContainEqual(completedRace);
  });

  it('should ignore races with a mix of ranked and unranked students', () => {
    const brokenRace = {
      id: 'fake-broken-id',
      name: 'Fake broken race',
      students: [
        {
          name: 'fake-student-1',
          rank: null,
        },
        {
          name: 'fake-student-2',
          rank: 1,
        },
        {
          name: 'fake-student-3',
          rank: null,
        },
      ],
    };
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify([brokenRace]));

    const { result } = renderHook(() => useRaces());

    expect(result.current.liveRaces).toHaveLength(0);
    expect(result.current.completedRaces).toHaveLength(0);
  });

  it('should not die if the localstorage contains a valid something that is not an array', () => {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify('Hehehe, sneaky!'));

    const { result } = renderHook(() => useRaces());

    expect(result.current.liveRaces).toHaveLength(0);
    expect(result.current.completedRaces).toHaveLength(0);
  });

  it('should not die if the localstorage contains gibberish', () => {
    localStorage.setItem(LOCALSTORAGE_KEY, '!!!');

    const { result } = renderHook(() => useRaces());

    expect(result.current.liveRaces).toHaveLength(0);
    expect(result.current.completedRaces).toHaveLength(0);
  });
});
