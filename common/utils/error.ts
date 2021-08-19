import { ResponseError } from '../types/ResponseError'

export function isError(data: any): data is ResponseError {
  return typeof data.message !== 'undefined' && typeof data.code !== 'undefined'
}
