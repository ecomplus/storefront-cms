import merge from 'lodash/merge';

import { getWidgetValueSerializer } from './registry';
import { isNullish } from './util/null.util';

import type { EntryData, Field, ObjectValue } from '../interface';

/**
 * Methods for serializing/deserializing entry field values. Most widgets don't
 * require this for their values, and those that do can typically serialize/
 * deserialize on every change from within the widget. The serialization
 * handlers here are for widgets whose values require heavy serialization that
 * would hurt performance if run for every change.

 * An example of this is the markdown widget, whose value is stored as a
 * markdown string. Instead of stringifying on every change of that field, a
 * deserialization method is registered from the widget's control module that
 * converts the stored markdown string to an AST, and that AST serves as the
 * widget model during editing.
 *
 * Serialization handlers should be registered for each widget that requires
 * them, and the registration method is exposed through the registry. Any
 * registered deserialization handlers run on entry load, and serialization
 * handlers run on persist.
 */
function runSerializer(
  values: EntryData,
  fields: Field[] | undefined,
  method: 'serialize' | 'deserialize',
) {
  /**
   * Reduce the list of fields to a map where keys are field names and values
   * are field values, serializing the values of fields whose widgets have
   * registered serializers.  If the field is a list or object, call recursively
   * for nested fields.
   */
  let serializedData =
    fields?.reduce((acc, field) => {
      const fieldName = field.name;
      const value = values?.[fieldName];
      const serializer =
        'widget' in field && field.widget ? getWidgetValueSerializer(field.widget) : undefined;
      const nestedFields = 'fields' in field ? field.fields : undefined;

      // Call recursively for fields within lists
      if (nestedFields && Array.isArray(value)) {
        for (const val of value) {
          if (typeof val === 'object') {
            acc[fieldName] = runSerializer(val as Record<string, EntryData>, nestedFields, method);
          }
        }
        return acc;
      }

      // Call recursively for fields within objects
      if (nestedFields && typeof value === 'object') {
        acc[fieldName] = runSerializer(value as Record<string, EntryData>, nestedFields, method);
        return acc;
      }

      // Run serialization method on value if not null or undefined
      if (serializer && !isNullish(value)) {
        acc[fieldName] = serializer[method](value);
        return acc;
      }

      // If no serializer is registered for the field's widget, use the field as is
      if (!isNullish(value)) {
        acc[fieldName] = value;
        return acc;
      }

      return acc;
    }, {} as ObjectValue) ?? {};

  //preserve unknown fields value
  serializedData = merge(values, serializedData);

  return serializedData;
}

export function serializeValues(values: EntryData, fields: Field[] | undefined) {
  return runSerializer(values, fields, 'serialize');
}

export function deserializeValues(values: EntryData, fields: Field[] | undefined) {
  return runSerializer(values, fields, 'deserialize');
}
