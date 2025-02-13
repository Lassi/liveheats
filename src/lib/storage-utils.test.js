import {
  LOCALSTORAGE_KEY,
  clearData,
  readData,
  writeData,
} from './storage-utils';

describe('storage-utils', () => {
  beforeAll(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('writeData', () => {
    it('should write the data to the localStorage', () => {
      const data = [{ value: 'hehehe' }];

      writeData(data);

      expect(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY))).toEqual(data);
    });
  });

  describe('readData', () => {
    it('should read the data from the localStorage', () => {
      const data = [{ value: 'hehehe' }];

      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));

      expect(readData()).toEqual(data);
    });

    it('should return an empty array if the content is not one', () => {
      const data = { value: 'not an array' };

      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));

      expect(readData()).toEqual([]);
    });
  });

  describe('clearData', () => {
    it('should remove the data from the localStorage', () => {
      const data = [{ value: 'hehehe' }];

      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));

      clearData();

      expect(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY))).toEqual(null);
    });
  });
});
