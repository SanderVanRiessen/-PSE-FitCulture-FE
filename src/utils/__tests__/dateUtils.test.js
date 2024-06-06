import { formatDate, formatDateTime } from '../dateUtils';

describe('dateUtils', () => {
  beforeAll(() => {
    // Mock the Date object to return a consistent date
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(Date.UTC(2023, 5, 15, 12, 34, 56)));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

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

      const expectedDateObj = new Date(Date.UTC(2023, 5, 15, 12, 34, 56));
      const expectedDay = expectedDateObj.getDate().toString().padStart(2, '0');
      const expectedMonth = (expectedDateObj.getMonth() + 1)
        .toString()
        .padStart(2, '0');
      const expectedYear = expectedDateObj.getFullYear();
      const expectedHours = expectedDateObj
        .getHours()
        .toString()
        .padStart(2, '0');
      const expectedMinutes = expectedDateObj
        .getMinutes()
        .toString()
        .padStart(2, '0');
      const expectedFormattedDateTime = `${expectedDay}-${expectedMonth}-${expectedYear} ${expectedHours}:${expectedMinutes}`;

      expect(formattedDateTime).toBe(expectedFormattedDateTime);
    });

    it('handles invalid datetime input gracefully', () => {
      const invalidDateTime = 'invalid-datetime';
      const formattedDateTime = formatDateTime(invalidDateTime);
      expect(formattedDateTime).toBe('NaN-NaN-NaN NaN:NaN');
    });
  });
});
