import { getInitials } from './student-utils';

describe('student-utils', () => {
  describe('getInitials', () => {
    it('should return the initials of a name', () => {
      expect(getInitials('Jean Valjean')).toEqual('JV');
    });

    it('should be ok with multiple spaces', () => {
      expect(getInitials('Miles      Davis')).toEqual('MD');
    });

    it('should be ok with spaces around', () => {
      expect(getInitials('  Dizzy  Gillespie   ')).toEqual('DG');
    });

    it('should only return 2 letter', () => {
      expect(getInitials('Jean Claude Van Damme')).toEqual('JC');
    });

    it('should return capitalize letters', () => {
      expect(getInitials('lowercase name')).toEqual('LN');
    });

    it('should return an empty string if provided with a non string', () => {
      expect(getInitials(4222)).toEqual('');
      expect(getInitials(undefined)).toEqual('');
      expect(getInitials(null)).toEqual('');
      expect(getInitials(NaN)).toEqual('');
    });
  });
});
