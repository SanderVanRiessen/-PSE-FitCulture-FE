import { formatDate, formatDateTime } from '../dateUtils';


describe('dateUtils', () => {
  describe('formatDate', () => {
    it('formats a date correctly', () => {
      const date = '2023-06-15T12:34:56Z';
      const formattedDate = formatDate(date);
      expect(formattedDate).toBe('15-06-2023');
    });

    it('handles invalid date input gracefully', () => {
      const invalidDate = 'invalid-date';
      const formattedDate = formatDate(invalidDate);
      expect(formattedDate).toBe('NaN-NaN-NaN');
    });
  });

  describe('formatDateTime', () => {
    it('formats a datetime correctly', () => {
      const dateTime = '2023-06-15T12:34:56Z';
      const formattedDateTime = formatDateTime(dateTime);
      expect(formattedDateTime).toBe('15-06-2023 12:34');
    });

    it('handles invalid datetime input gracefully', () => {
      const invalidDateTime = 'invalid-datetime';
      const formattedDateTime = formatDateTime(invalidDateTime);
      expect(formattedDateTime).toBe('NaN-NaN-NaN NaN:NaN');
    });
  });
});
