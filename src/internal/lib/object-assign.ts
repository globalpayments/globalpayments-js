/**
 * Creates a single object by merging a `source` (default) and `properties`
 * obtained elsewhere. Any properties in `properties` will overwrite
 * matching properties in `source`.
 *
 * @param source
 * @param properties
 */
export default function objectAssign(source: object, properties: object) {
  const destination: object = {};

  if (!source) {
    source = {};
  }

  for (const property in source) {
    if (source.hasOwnProperty(property)) {
      (destination as any)[property] = (source as any)[property];
    }
  }

  for (const property in properties) {
    if (properties.hasOwnProperty(property)) {
      (destination as any)[property] = (properties as any)[property];
    }
  }

  return destination;
}
