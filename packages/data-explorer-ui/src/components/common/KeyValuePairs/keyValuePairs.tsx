import React, { ElementType, ReactNode } from "react";
import { Stack } from "../Stack/stack";

/**
 * Basic key value pairs component.
 * Optional wrapper components for the key values, key value tuple, key and value for complete ui flexibility.
 */

export type Key = ReactNode;
export type Value = ReactNode | ReactNode[] | ValueKeyValueFnTuple;
export type ValueKeyValueFnTuple = [Value, KeyValueFn | undefined];
export type KeyValueFn = () => void; // An KeyValue element onClick function.
export type KeyValues = Map<Key, Value>;

export interface KeyValuePairsProps {
  KeyElType?: ElementType; // Wrapper element around key.
  KeyValueElType?: ElementType; // Wrapper element around key value tuple.
  keyValuePairs: KeyValues;
  KeyValuesElType?: ElementType; // Wrapper element around key value pairs.
  ValueElType?: ElementType; // Wrapper elements around value.
}

export const KeyValuePairs = ({
  KeyElType: Key = "span",
  KeyValueElType: KeyValue = Stack,
  keyValuePairs,
  KeyValuesElType: KeyValues = Stack,
  ValueElType: Value = "span",
}: KeyValuePairsProps): JSX.Element => {
  return (
    <KeyValues>
      {[...keyValuePairs].map(([key, valueKeyValueFn], k) => {
        const [value, keyValueFn] = partitionValueKeyValueFn(valueKeyValueFn);
        const keyValueProps = keyValueFn ? { keyValueFn } : {};
        return (
          <KeyValue key={`${key}${k}`} {...keyValueProps}>
            <Key>{key}</Key>
            <Value>{value}</Value>
          </KeyValue>
        );
      })}
    </KeyValues>
  );
};

/**
 * Determine if the given value is a tuple of value and function, and not a singular value.
 * @param value - Value, either a tuple of Value and KeyValueFn, or a singular Value.
 * @returns true if the given value is a tuple of value and function.
 */
function isValueValueKeyValueFnTuple(
  value: Value
): value is ValueKeyValueFnTuple {
  if (Array.isArray(value) && value.length === 2) {
    return typeof value[1] === "function";
  }
  return false;
}

/**
 * Partitions value into a tuple of value and function.
 * The given value may be typed as a singular Value (see type Value) and therefore the partition facilitates this possibility.
 * @param value - Value, either a tuple of Value and KeyValueFn, or a singular Value.
 * @returns Tuple containing a ReactNode or ReactNode array, and an optional function.
 */
function partitionValueKeyValueFn(value: Value): ValueKeyValueFnTuple {
  if (isValueValueKeyValueFnTuple(value)) {
    return value;
  }
  return [value, undefined];
}
