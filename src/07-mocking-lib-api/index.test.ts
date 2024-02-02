// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const relativePath = '/comments';
    const spyOnAxiosCreate = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();

    expect(spyOnAxiosCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/comments';

    const spyOn = jest.spyOn(axios.Axios.prototype, 'get');
    await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();
    expect(spyOn).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const relativePath = '/comments';
    const data = 'some data bla bla bla';

    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementation(() => Promise.resolve({ data }));

    const res = await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();
    expect(res).toBe(data);
  });
});
