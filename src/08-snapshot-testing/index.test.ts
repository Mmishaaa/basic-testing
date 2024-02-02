// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const values = {
      value: 10,
      next: {
        value: 11,
        next: {
          value: 12,
          next: {
            value: 13,
            next: { value: 100, next: { value: null, next: null } },
          },
        },
      },
    };
    expect(values).toStrictEqual(generateLinkedList([10, 11, 12, 13, 100]));
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const values = {
      value: 10,
      next: {
        value: 11,
        next: {
          value: 12,
          next: {
            value: 13,
            next: { value: 100, next: { value: null, next: null } },
          },
        },
      },
    };
    expect(values).toMatchSnapshot(generateLinkedList([10, 11, 12, 13, 100]));
  });
});
