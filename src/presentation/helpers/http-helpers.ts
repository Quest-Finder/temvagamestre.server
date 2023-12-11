import type { HttpResponse } from '@/presentation/types/http'
import { ServerError } from '@/presentation/errors/server-error'

export const ok = (body: any): HttpResponse => ({
  statusCode: 200,
  body
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})
