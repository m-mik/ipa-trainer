export function removeByIndex<T>(array: T[], index: number): T[] {
  return array.filter((_, i) => i !== index)
}

export function updateByIndex<T, V>(
  array: T[],
  index: number,
  value: V
): (T | V)[] {
  return array.map((item, i) => (i === index ? value : item))
}

export function addToArray<T, V>(array: T[], value: V): (T | V)[] {
  return [...array, value]
}
