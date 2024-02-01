// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 5, action: Action.Add })).toBe(7);
    expect(simpleCalculator({ a: 2, b: -5, action: Action.Add })).toBe(-3);
    expect(simpleCalculator({ a: -2, b: 5, action: Action.Add })).toBe(3);
    expect(simpleCalculator({ a: -2, b: -5, action: Action.Add })).toBe(-7);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 5, action: Action.Subtract })).toBe(-3);
    expect(simpleCalculator({ a: 2, b: -5, action: Action.Subtract })).toBe(7);
    expect(simpleCalculator({ a: -2, b: 5, action: Action.Subtract })).toBe(-7);
    expect(simpleCalculator({ a: -2, b: -5, action: Action.Subtract })).toBe(3);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 5, action: Action.Multiply })).toBe(10);
    expect(simpleCalculator({ a: 2, b: -5, action: Action.Multiply })).toBe(
      -10,
    );
    expect(simpleCalculator({ a: -2, b: 5, action: Action.Multiply })).toBe(
      -10,
    );
    expect(simpleCalculator({ a: -2, b: -5, action: Action.Multiply })).toBe(
      10,
    );
    expect(simpleCalculator({ a: 0, b: 5, action: Action.Multiply })).toBe(0);
    expect(simpleCalculator({ a: 2, b: 0, action: Action.Multiply })).toBe(0);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 25, b: 5, action: Action.Divide })).toBe(5);
    expect(simpleCalculator({ a: 25, b: -5, action: Action.Divide })).toBe(-5);
    expect(simpleCalculator({ a: -25, b: 5, action: Action.Divide })).toBe(-5);
    expect(simpleCalculator({ a: -25, b: -5, action: Action.Divide })).toBe(5);
    expect(simpleCalculator({ a: 0, b: 5, action: Action.Divide })).toBe(0);
    expect(simpleCalculator({ a: 25, b: 0, action: Action.Divide })).toBe(
      Infinity,
    );
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Exponentiate })).toBe(
      1,
    );
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Exponentiate })).toBe(
      4,
    );
    expect(simpleCalculator({ a: 3, b: 2, action: Action.Exponentiate })).toBe(
      9,
    );
    expect(simpleCalculator({ a: 3, b: 3, action: Action.Exponentiate })).toBe(
      27,
    );
    expect(
      simpleCalculator({ a: 10, b: -2, action: Action.Exponentiate }),
    ).toBe(0.01);
    expect(simpleCalculator({ a: 25, b: 0, action: Action.Exponentiate })).toBe(
      1,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 25, b: 5, action: 2 })).toBeNull();
    expect(simpleCalculator({ a: 25, b: -5, action: '212dsd1' })).toBeNull();
    expect(
      simpleCalculator({ a: -25, b: 5, action: 'Action.Divide' }),
    ).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({ a: '25', b: 5, action: Action.Subtract }),
    ).toBeNull();
    expect(simpleCalculator({ a: 25, b: '5', action: Action.Add })).toBeNull();
    expect(
      simpleCalculator({ a: 'ssdcs', b: 'SSSS', action: Action.Divide }),
    ).toBeNull();
  });
});
