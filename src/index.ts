import { NotAnObjectError } from './errors';

/**
 * Recursive solution to allow complex objects to be used in the deletion.
 * @param data
 * @param deletes A list of properties
 */
const deleteProperty = (data: any, deletes: string[]): Record<string, any> => {
  // In case we get an array, we need to recursively loop through every element as well.
  if (Array.isArray(data)) {
    return data.map((element) => deleteProperty(element, deletes));
  }

  const toDelete = deletes[0];

  if (deletes.length === 1) {
    // Remove the one particular property
    const { [toDelete]: unused, ...leftover } = data;
    return leftover;
  }

  // Guard to prevent non-existing deeper properties from being accessed.
  if (!data[toDelete]) {
    return data;
  }

  // Recursive delete
  return {
    ...data,
    [toDelete]: deleteProperty(data[toDelete], deletes.slice(1)),
  };
};

/**
 * Delete one or multiple properties from the given object using strings.
 * @param data An object to delete a property from
 * @param deletes A list of dot-based properties in string form (ex. a.b.c.d.e)
 */
export const deleteProperties = (
  data: any,
  ...deletes: string[]
): Record<string, any> => {
  if (!Array.isArray(data) && typeof data !== 'object') {
    throw new NotAnObjectError();
  }

  // Loop through all the deletes and use the return value in the next
  return deletes.reduce(
    (result, toDelete) => deleteProperty(result, toDelete.split('.')),
    data,
  );
};
