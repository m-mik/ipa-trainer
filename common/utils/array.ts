export function removeByIndex(array: any[], index: number) {
  return array.filter((_, i) => i !== index)
}

export function updateByIndex(array: any[], index: number, value: any) {
  return array.map((item, i) => (i === index ? value : item))
}

export function addToArray(array: any[], value: any) {
  return [...array, value]
}
