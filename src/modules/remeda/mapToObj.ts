import { PredIndexedOptional } from './_types';
import { purry } from './purry';

/**
 * Map each element of an array into an object using a defined callback function.
 * @param array The array to map.
 * @param fn The mapping function, which should return a tuple of [key, value], similar to Object.fromEntries
 * @returns The new mapped object.
 * @signature
 *    R.mapToObj(array, fn)
 *    R.mapToObj.indexed(array, fn)
 * @example
 *    R.mapToObj([1, 2, 3], x => [String(x), x * 2]) // => {1: 2, 2: 4, 3: 6}
 *    R.mapToObj.indexed([0, 0, 0], (x, i) => [i, i]) // => {0: 0, 1: 1, 2: 2}
 * @dataFirst
 * @indexed
 * @category Array
 */
export function mapToObj<T, K extends PropertyKey, V>(
  array: ReadonlyArray<T>,
  fn: (element: T) => [K, V]
): Record<K, V>;

/**
 * Map each element of an array into an object using a defined callback function.
 * @param fn The mapping function, which should return a tuple of [key, value], similar to Object.fromEntries
 * @returns The new mapped object.
 * @signature
 *    R.mapToObj(fn)(array)
 *    R.mapToObj.indexed(fn)(array)
 * @example
 *    R.pipe(
 *      [1, 2, 3],
 *      R.mapToObj(x => [String(x), x * 2])
 *    ) // => {1: 2, 2: 4, 3: 6}
 *    R.pipe(
 *      [0, 0, 0],
 *      R.mapToObj.indexed((x, i) => [i, i])
 *    ) // => {0: 0, 1: 1, 2: 2}
 * @dataLast
 * @indexed
 * @category Array
 */
export function mapToObj<T, K extends PropertyKey, V>(
  fn: (element: T) => [K, V]
): (array: ReadonlyArray<T>) => Record<K, V>;

export function mapToObj() {
  return purry(_mapToObj(false), arguments);
}

const _mapToObj =
  (indexed: boolean) =>
  (
    array: ReadonlyArray<unknown>,
    fn: PredIndexedOptional<unknown, [PropertyKey, unknown]>
  ) => {
    return array.reduce<Record<PropertyKey, unknown>>(
      (result, element, index) => {
        const [key, value] = indexed ? fn(element, index, array) : fn(element);
        result[key] = value;
        return result;
      },
      {}
    );
  };

export namespace mapToObj {
  export function indexed<T, K extends PropertyKey, V>(
    array: ReadonlyArray<T>,
    fn: (element: T, index: number, array: ReadonlyArray<T>) => [K, V]
  ): Record<K, V>;
  export function indexed<T, K extends PropertyKey, V>(
    fn: (element: T, index: number, array: ReadonlyArray<T>) => [K, V]
  ): (array: ReadonlyArray<T>) => Record<K, V>;
  export function indexed() {
    return purry(_mapToObj(true), arguments);
  }
}