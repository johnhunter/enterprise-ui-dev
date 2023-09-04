import { test, expect, vi } from 'vitest';
import { log } from './log';
import Arithmetic from './arithmetic';

// Treat mocks with suspicion!

vi.mock('./arithmetic.ts');

test('we can assert on mocks', () => {
  const mock = vi.fn((x?: string) => {
    if (x) {
      return x.repeat(3);
    }
  });

  mock();
  mock();
  const result = mock('wow');

  expect(mock).toBeCalledTimes(3);
  expect(mock).toHaveBeenLastCalledWith('wow');

  // useful for initially getting coverage while refactoring
  expect(result).toMatchInlineSnapshot('"wowwowwow"');
});

test('we can spy on the console log', () => {
  vi.spyOn(console, 'log').mockImplementation(() => {});

  log('log', 1, 2, 3);

  expect(console.log).toHaveBeenCalledWith(1, 2, 3);
});

test('it mocks the multiply method', () => {
  const result = Arithmetic.multiply(2, 2);

  expect(Arithmetic.multiply).toHaveBeenLastCalledWith(2, 2);

  // Methods are mocked without implementation
  expect(result).toBe(undefined);
});
