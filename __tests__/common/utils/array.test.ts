import { addToArray, removeByIndex, updateByIndex } from '@/common/utils/array'

describe('array utils', () => {
  let array: number[]
  beforeEach(() => {
    array = [1, 2, 3, 4, 5]
  })

  describe('removeByIndex', () => {
    it('should remove an item at the provided index', () => {
      expect(removeByIndex(array, -1)).toEqual([1, 2, 3, 4, 5])
      expect(removeByIndex(array, 0)).toEqual([2, 3, 4, 5])
      expect(removeByIndex(array, 2)).toEqual([1, 2, 4, 5])
      expect(removeByIndex(array, 10)).toEqual([1, 2, 3, 4, 5])
    })

    it('should not mutate the original array', () => {
      expect(removeByIndex(array, 0)).toEqual([2, 3, 4, 5])
      expect(array).toEqual([1, 2, 3, 4, 5])
    })
  })

  describe('updateByIndex', () => {
    it('should update an item at the provided index', () => {
      expect(updateByIndex(array, 2, 999)).toEqual([1, 2, 999, 4, 5])
    })

    it('should not mutate the original array', () => {
      expect(updateByIndex(array, 0, 999)).toEqual([999, 2, 3, 4, 5])
      expect(array).toEqual([1, 2, 3, 4, 5])
    })
  })

  describe('addToArray', () => {
    it('should add an item to the array', () => {
      expect(addToArray(array, 999)).toEqual([1, 2, 3, 4, 5, 999])
    })

    it('should not mutate the original array', () => {
      expect(addToArray(array, 999)).toEqual([1, 2, 3, 4, 5, 999])
      expect(array).toEqual([1, 2, 3, 4, 5])
    })
  })
})
