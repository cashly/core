import { calculateIncomeForDate, IncomeEvent } from '../src/entry/income';

describe('ExpenseEvent', () => {
  test('doesApply returns true when EventApplierLegacy returns true', () => {
    let entry = new IncomeEvent('Event', 0, {
      doesApply: () => true
    });

    expect(entry.doesApply(new Date())).toBe(true);
  });

  test('doesApply returns false when EventApplierLegacy returns false', () => {
    let entry = new IncomeEvent('Event', 0, {
      doesApply: () => false
    });

    expect(entry.doesApply(new Date())).toBe(false);
  });
});

describe('calculateIncomeForDate', () => {
  test('calls doesApply for incomeEntries', () => {
    let entry = new IncomeEvent('Event', 0, {
      doesApply: jest.fn()
    });

    calculateIncomeForDate(new Date(), [entry]);

    expect(entry.frequency.doesApply as jest.Mock).toBeCalled();
  });

  test('adds amount when doesApply is true', () => {
    let entry = new IncomeEvent('Event', 10, {
      doesApply: () => true
    });

    let result = calculateIncomeForDate(new Date(), [entry]);

    expect(result).toBe(entry.amount);
  });

  test('doesn\'t add amount when doesApply is false', () => {
    let entry = new IncomeEvent('Event', 10, {
      doesApply: () => false
    });

    let result = calculateIncomeForDate(new Date(), [entry]);

    expect(result).toBe(0);
  });
});
