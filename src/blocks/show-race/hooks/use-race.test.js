import { renderHook } from '@testing-library/react';

import { LOCALSTORAGE_KEY } from '@/lib/constants';

import { useRace } from './use-race';

describe('useRace', () => {
  beforeAll(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should return null if the race id does not exist', () => {
    const { result } = renderHook(() => useRace('not-a-valid-id'));

    expect(result.current).toBeNull();
  });

  it('should return the race with the given id if it exist', () => {
    const race = {
      id: 'fake-race-id',
      name: 'Fake race name',
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
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify([race]));

    const { result } = renderHook(() => useRace(race.id));

    expect(result.current).toEqual(race);
  });

  it('should return null if the localstorage contains a valid something that is not an array', () => {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify('Hehehe, sneaky!'));

    const { result } = renderHook(() => useRace('another-id'));

    expect(result.current).toBeNull();
  });

  it('should return null if the localstorage contains gibberish', () => {
    localStorage.setItem(LOCALSTORAGE_KEY, '!!!');

    const { result } = renderHook(() => useRace('last-id'));

    expect(result.current).toBeNull();
  });
});
