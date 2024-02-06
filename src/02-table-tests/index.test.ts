// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 2, b: 5, action: Action.Add, expected: 7 },
  { a: 2, b: -5, action: Action.Add, expected: -3 },
  { a: -2, b: 5, action: Action.Add, expected: 3 },
  { a: -2, b: -5, action: Action.Add, expected: -7 },
  { a: 2, b: 5, action: Action.Subtract, expected: -3 },
  { a: 2, b: -5, action: Action.Subtract, expected: 7 },
  { a: -2, b: 5, action: Action.Subtract, expected: -7 },
  { a: -2, b: -5, action: Action.Subtract, expected: 3 },
  { a: 2, b: 5, action: Action.Multiply, expected: 10 },
  { a: 2, b: -5, action: Action.Multiply, expected: -10 },
  { a: -2, b: 5, action: Action.Multiply, expected: -10 },
  { a: -2, b: -5, action: Action.Multiply, expected: 10 },
  { a: 0, b: 5, action: Action.Multiply, expected: 0 },
  { a: 2, b: 0, action: Action.Multiply, expected: 0 },
  { a: 25, b: 5, action: Action.Divide, expected: 5 },
  { a: 25, b: -5, action: Action.Divide, expected: -5 },
  { a: -25, b: 5, action: Action.Divide, expected: -5 },
  { a: -25, b: -5, action: Action.Divide, expected: 5 },
  { a: 0, b: 5, action: Action.Divide, expected: 0 },
  { a: 25, b: 0, action: Action.Divide, expected: Infinity },
  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 10, b: -2, action: Action.Exponentiate, expected: 0.01 },
  { a: 25, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 25, b: 5, action: 2, expected: null },
  { a: -25, b: 5, action: 'asaadada', expected: null },
  { a: 25, b: -5, action: 'Action.Divide', expected: null },
  { a: '25', b: -5, action: Action.Divide, expected: null },
  { a: 0, b: '5', action: Action.Divide, expected: null },
  { a: '25', b: '0', action: Action.Divide, expected: null },

  // continue cases for other actions
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  test.each(testCases)(
    ' $a $b $action, $expected ',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
  // Consider to use Jest table tests API to test all cases above
});
