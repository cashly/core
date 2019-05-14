import { runSimulation, runSimulationForDate } from '../src/simulator';

describe('simulationResult', () => {
});

describe('runSimulation', () => {
  test('runs simulation for start startDate', () => {
    const options = {
      startDate: new Date(),
      endDate: new Date()
    };
    const data = {
      income: []
    };
    const fns = {
      simulationFunction: jest.fn(),
      nextDateFunction: jest.fn(),
      mergeResultFunction: jest.fn()
    };

    runSimulation(options, data, fns);
    expect(fns.nextDateFunction).toBeCalledWith(options.startDate);
  });

  test('doesn\'t run after end startDate', () => {
    const options = {
      startDate: new Date(),
      endDate: new Date()
    };
    const data = {
      income: []
    };
    const fns = {
      simulationFunction: jest.fn(),
      nextDateFunction: jest.fn((currentDate: Date) => {
        let date = new Date(currentDate);
        date.setDate(date.getDate() + 1);
        return date;
      }),
      mergeResultFunction: jest.fn()
    };

    runSimulation(options, data, fns);
    expect(fns.nextDateFunction).toBeCalledTimes(1);
  });

  test('runs simulation for every startDate generated that isn\'t after the end startDate', () => {
    const options = {
      startDate: new Date(),
      endDate: new Date()
    };
    options.endDate.setFullYear(options.endDate.getFullYear() + 1);

    const data = {
      income: []
    };

    let generatedDates: Date[] = [];

    const fns = {
      simulationFunction: jest.fn(),
      nextDateFunction: jest.fn((currentDate: Date) => {
        let date = new Date(currentDate);
        date.setDate(date.getDate() + 1);
        generatedDates = generatedDates.concat(date);
        return date;
      }),
      mergeResultFunction: jest.fn()
    };

    runSimulation(options, data, fns);

    // Remove the last startDate since it is after the end startDate
    generatedDates = generatedDates.slice(0, generatedDates.length - 1);

    // Add one to account for the start startDate which is not in the array;
    let expectedCalls = generatedDates.length + 1;

    expect(fns.simulationFunction).toBeCalledTimes(expectedCalls);

    generatedDates.forEach(date => {
      expect(fns.simulationFunction).toBeCalledWith(date, data);
    });
  });

  test('', () => {

  });
});
