import { deleteProperties } from './index';
import { NotAnObjectError } from './errors';

describe('deleteProperties', () => {
  const testData = [
    // Empty object
    {
      data: <any>{},
      expected: <any>{},
      deletes: [],
    },
    // A simple property delete
    {
      data: <any>{
        foo: 'bar',
      },
      expected: <any>{},
      deletes: ['foo'],
    },
    // A simple property delete inside an array
    {
      data: <any>[
        { foo: 1, baz: 2 },
        { foo: 3, baz: 4 },
        { foo: 5, baz: 6 },
      ],
      expected: <any>[{ baz: 2 }, { baz: 4 }, { baz: 6 }],
      deletes: ['foo'],
    },
    // A simple property delete inside a deeper array
    {
      data: <any>{
        bar: [
          { foo: 1, baz: 2 },
          { foo: 3, baz: 4 },
          { foo: 5, baz: 6 },
        ],
      },
      expected: <any>{
        bar: [{ baz: 2 }, { baz: 4 }, { baz: 6 }],
      },
      deletes: ['bar.foo'],
    },
    // Deleting a deep property that doesn't exist
    {
      data: <any>{
        foo: 'bar',
      },
      expected: <any>{
        foo: 'bar',
      },
      deletes: ['bez.oz.dez'],
    },
    // Weird key names
    {
      data: <any>{
        'we need to check whether spaces work too!': {
          simple: 'bar',
        },
      },
      expected: <any>{
        'we need to check whether spaces work too!': {},
      },
      deletes: ['we need to check whether spaces work too!.simple'],
    },
    // Remove and keep a few properties
    {
      data: <any>{
        a: 'a',
        b: 'b',
        c: 'c',
        d: 'd',
      },
      expected: <any>{
        b: 'b',
        d: 'd',
      },
      deletes: ['a', 'c'],
    },
    // Remove 1 deep property
    {
      data: <any>{
        foo: {
          bar: {
            baz: 'nope',
            bez: 'yup',
          },
        },
      },
      expected: <any>{
        foo: {
          bar: {
            bez: 'yup',
          },
        },
      },
      deletes: ['foo.bar.baz'],
    },
    // Remove a property that doesn't exist
    {
      data: <any>{
        foo: {
          bar: {
            bez: 'yup',
          },
        },
      },
      expected: <any>{
        foo: {
          bar: {
            bez: 'yup',
          },
        },
      },
      deletes: ['foo.bar.baz'],
    },
    // Complex object, we delete a few properties
    {
      data: <any>{
        a: 1,
        b: 2,
        c: {
          d: ['e', 'f', 'g'],
          e: { other: 20 },
        },
        g: { h: { i: { j: { k: 'hello', l: 'there' } } } },
        m: { n: 'sir' },
      },
      expected: <any>{
        b: 2,
        c: {
          e: { other: 20 },
        },
        g: { h: { i: { j: { l: 'there' } } } },
      },
      deletes: ['a', 'c.d', 'g.h.i.j.k', 'm'],
    },
  ];

  testData.forEach(({ data, expected, deletes }) => {
    it(`returns ${JSON.stringify(expected)} on deletes ${deletes.join(
      ', ',
    )}`, () => {
      // Act
      const result = deleteProperties(data, ...deletes);

      // Assert
      expect(result).toEqual(expected);
    });
  });

  const nonObjects = [1, 'yes', false, 0.534];

  nonObjects.forEach((input) => {
    it(`throws a NotAnObjectError on non-object input`, () => {
      // Act
      const result = () => deleteProperties(input);

      // Arrange
      expect(result).toThrowError(NotAnObjectError);
    });
  });
});
