import { MonthlyEvent, YearlyEvent } from '../src/eventApplierLegacy';

describe('MonthlyEvent', () => {
  test('doesApply returns true on same day of startDate', () => {
    let date = new Date();
    let nextDate = new Date();
    nextDate.setMonth(nextDate.getMonth() + 1);

    let event = new MonthlyEvent(date);
    expect(event.doesApply(nextDate)).toBe(true);
  });
});

describe('YearlyEvent', () => {
  test('doesApply returns true on different year', () => {
    let date = new Date();
    let nextDate = new Date();
    nextDate.setFullYear(nextDate.getFullYear() + 1);

    let event = new YearlyEvent(date);
    expect(event.doesApply(nextDate)).toBe(true);
  });
});
