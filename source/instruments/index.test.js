// Core
import { sum, delay, getUniqueID, getFullApiUrl } from './';

jest.setTimeout(10000);

describe('instruments', () => {
    test('sum should be a function', () => {
        expect(sum).toBeInstanceOf(Function);
    });

    test('sum function should throw an error, when called with non-number type as first argument', () => {
        expect(() => sum('hi', 2)).toThrow();
    });

    test('sum function should throw an error, when called with non-number type as second argument', () => {
        expect(() => sum(2, 'hi')).toThrow();
    });

    test('sum function should return sum of two numbers passed', () => {
        expect(sum(2, 3)).toBe(5);
        expect(sum(1, 8)).toMatchSnapshot();
    });

    test('delay should return a resolved promise', async () => {
        await expect(delay()).resolves.toBeUndefined();
    });

    test('getUniqueID should be a function', () => {
        expect(getUniqueID).toBeInstanceOf(Function);
    });

    test('getUniqueID function should throw an error, when called with non-number type as argument', () => {
        expect(() => getUniqueID('hi')).toThrow();
    });

    test('getUniqueID function should return a string with a length of the passed argument', () => {
        expect(typeof getUniqueID()).toBe('string');
        expect(getUniqueID(5)).toHaveLength(5);
        expect(getUniqueID(13)).toHaveLength(13);
    });

    test('getUniqueID function should return a string with a length of 15 if no argument passed', () => {
        expect(typeof getUniqueID()).toBe('string');
        expect(getUniqueID()).toHaveLength(15);
    });

    test('getFullApiUrl function should throw an error, when called with non-string type as first argument', () => {
        expect(() => getFullApiUrl(2, 'hi')).toThrow();
    });

    test('getFullApiUrl function should throw an error, when called with non-string type as second argument', () => {
        expect(() => getFullApiUrl('hi', 2)).toThrow();
    });

    test('getFullApiUrl function should return a string with concatenation of two passed string with dash between them', () => {
        expect(typeof getFullApiUrl('one', 'two')).toBe('string');
        expect(getFullApiUrl('one', 'two')).toHaveLength(7);
        expect(getFullApiUrl('one', 'two')).toBe('one/two');
        expect(getFullApiUrl('two', 'one')).toBe('two/one');
    });
});
