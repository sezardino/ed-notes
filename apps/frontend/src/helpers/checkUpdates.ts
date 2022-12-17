export const checkUpdates = <T extends Record<string, any>>(
  original: T,
  changed: Partial<T>
) =>
  Object.fromEntries(
    Object.entries(changed).filter(
      ([key, value]) => JSON.stringify(original[key]) !== JSON.stringify(value)
    )
  );
