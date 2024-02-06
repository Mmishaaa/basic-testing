// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';
import fsPromise from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');

    const timeout = 1000;
    const callback = jest.fn();

    doStuffByTimeout(callback, timeout);

    expect(setTimeout).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');

    const timeout = 1000;
    const callback = jest.fn();

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(timeout);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');

    const timeout = 1000;
    const callback = jest.fn();

    doStuffByInterval(callback, timeout);

    expect(setInterval).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');

    const timeout = 1000;
    const callback = jest.fn();

    doStuffByInterval(callback, timeout);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(timeout);
    expect(callback).toBeCalledTimes(1);

    jest.advanceTimersByTime(timeout);
    expect(callback).toBeCalledTimes(2);

    jest.advanceTimersByTime(timeout);
    expect(callback).toBeCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = './index.txt';

    jest.spyOn(path, 'join');

    await readFileAsynchronously(pathToFile);
    expect(path.join).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = './index.txt';

    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const res = await readFileAsynchronously(pathToFile);
    expect(res).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = './index.txt';
    const fileContent = 'File content bla bla bla';

    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPromise, 'readFile').mockResolvedValue(fileContent);

    const res = await readFileAsynchronously(pathToFile);
    expect(res).toBe(fileContent);
  });
});
