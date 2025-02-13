import { validateRanking } from './ranking-utils';

describe('ranking-utils', () => {
  describe('validateRanking', () => {
    it('should validate that all ranks are provided', () => {
      expect(
        validateRanking([1, 2], 4)
      ).toEqual({
        valid: false,
        error: 'a rank is required for each student',
      });
    });

    it('should validate that all ranks are positive integers', () => {
      const testCases = [
        ['-123'],
        ['cheeky'],
        [null],
        [undefined],
        [NaN],
        [[]],
        [{}],
      ];

      for (const testCase of testCases) {
        expect(
          validateRanking(testCase, 1)
        ).toEqual({
          valid: false,
          error: 'ranks can only be positive integers',
        });
      }
    });

    it('should validate that the first rank is 1', () => {
      expect(
        validateRanking([2, 3, 4, 5], 4)
      ).toEqual({
        error: 'ranks need to start at 1',
        valid: false,
      });
    });

    it('should validate that all ranks are provided if there is no tie', () => {
      const testCases = [
        [[1, 2, 4, 5], 'a rank was skipped: 3'],
        [[1, 3, 4, 6], 'a rank was skipped: 2'],
        [[1, 2, 3, 9], 'a rank was skipped: 4'],
      ];

      for (const [ranks, error] of testCases) {
        expect(
          validateRanking(ranks , 4)
        ).toEqual({
          valid: false,
          error,
        });
      };
    });

    it('should validate that all ranks are provided correctly if there is a tie', () => {
      const testCases = [
        [[1, 1, 4, 5], 'incorrect rank after tie: 4'],
        [[1, 2, 2, 3], 'incorrect rank after tie: 3'],
        [[1, 1, 1, 42], 'incorrect rank after tie: 42'],
      ];

      for (const [ranks, error] of testCases) {
        expect(
          validateRanking(ranks , 4)
        ).toEqual({
          valid: false,
          error,
        });
      };
    });

    it('should approve correct ranking', () => {
      const testCases = [
        [1, 1, 1, 1],
        [1, 2, 2, 4],
        [1, 1, 1, 4],
        [1, 1, 1, 4, 4, 4, 7],
        [1, 1, 3, 3, 5, 5, 7],
      ];

      for (const ranks of testCases) {
        expect(
          validateRanking(ranks , ranks.length)
        ).toEqual({
          valid: true,
        });
      };
    });
  });
});