import { Catch, HttpException, HttpStatus, type ArgumentsHost, type ExceptionFilter } from '@nestjs/common'
import { type Response } from 'express'
import { ValidationException } from '../exceptions/validation-execption'

const httpStatusDescription = {
  100: 'Continue',
  101: 'Switch Protocols',
  102: 'Processing',
  103: 'Earlyhints',
  200: 'Ok',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  300: 'Ambiguous',
  301: 'Moved Permanently',
  302: 'Found',
  303: 'See Other',
  304: 'Not Modified',
  307: 'Temporary redirect',
  308: 'Permanent Redirect',
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Payload Too Large',
  414: 'URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Requested Range not Satisfiable',
  417: 'Expectation Failed',
  418: 'I am a Teapot',
  421: 'Misdirected',
  422: 'Unprocessable Entity',
  424: 'Failed Dependency',
  428: 'Precondition Required',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'Http Version Not Supported'
}

type ErrorBody = {
  timestamp: number
  statusCode: number
  title: string
  detail: string
  path: string
  objects?: unknown
}

@Catch()
export class AppExceptionHandlerFilter implements ExceptionFilter {
  catch (exception: any, host: ArgumentsHost): any {
    /* eslint-disable @typescript-eslint/consistent-type-assertions */
    const ctx = host.switchToHttp()
    let bodyError = {} as ErrorBody
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    console.error(exception)
    if (exception instanceof HttpException) {
      bodyError = {
        detail: exception.message,
        title: httpStatusDescription[exception.getStatus()],
        statusCode: exception.getStatus(),
        timestamp: new Date().getTime(),
        path: request.url
      }
    }

    if (exception instanceof ValidationException) {
      bodyError = {
        detail: 'Erro na validação de campos',
        title: httpStatusDescription[HttpStatus.BAD_REQUEST],
        statusCode: HttpStatus.BAD_REQUEST,
        timestamp: new Date().getTime(),
        path: request.url,
        objects: exception.fieldsErrors
      }
    }

    if (!bodyError.statusCode) {
      bodyError = {
        detail: 'Tente novamente mais tarde',
        title: httpStatusDescription[HttpStatus.INTERNAL_SERVER_ERROR],
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        timestamp: new Date().getTime(),
        path: request.url
      }
    }

    return response
      .status(bodyError.statusCode)
      .json(bodyError)
  }
}
