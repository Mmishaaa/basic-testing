// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    await expect(resolveValue(5)).resolves.toBe(5);
    await expect(resolveValue('5')).resolves.toBe('5');
    await expect(resolveValue('')).resolves.toBe('');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError('Message for Error')).toThrow('Message for Error');
  });

  test('should throw error with default message if message is not provided', () => {
    // Write your test here
    expect(() => throwError()).toThrowError('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    // Write your test here
    expect(() => throwCustomError()).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(() => rejectCustomError()).rejects.toThrowError(
      MyAwesomeError,
    );
  });
});
