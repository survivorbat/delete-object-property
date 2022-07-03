/**
 * Recursive solution to allow complex objects to be used in the deletion.
 * @param data
 * @param deletes A list of properties
 */
const deleteProperty = (
  data: Record<string, any>,
  deletes: string[],
): Record<string, any> => {
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
  data: Record<string, any>,
  ...deletes: string[]
): Record<string, any> => {
  // Loop through all the deletes and use the return value in the next
  return deletes.reduce(
    (result, toDelete) => deleteProperty(result, toDelete.split('.')),
    data,
  );
};
