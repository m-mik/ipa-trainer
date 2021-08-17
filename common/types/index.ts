export type ResponseError = {
  message: string
  code: number
}

export function isError(data: any): data is ResponseError {
  return typeof data.error !== 'undefined'
}
