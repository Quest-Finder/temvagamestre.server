import { ApiProperty, PickType } from '@nestjs/swagger'

export class FieldDetail {
  @ApiProperty({ description: 'Field name', example: 'name' })
    field: string

  @ApiProperty({ description: 'Field erro message', example: 'Is required' })
    message: string

  constructor (field: string, message: string) {
    this.field = field
    this.message = message
  }
}

export class ErrorDetailField {
  @ApiProperty({ description: 'Error time', example: 123546 })
    timestamp: number

  @ApiProperty({ description: 'Status code', example: 400 })
    statusCode: number

  @ApiProperty({ description: 'Error Title', example: 'Bad Request' })
    title: string

  @ApiProperty({ description: 'Description about error', example: 'Input validation' })
    detail: string

  @ApiProperty({ description: 'Resource path', example: '/users' })
    path: string

  @ApiProperty({ description: 'List of fields errors', isArray: true })
    objects?: FieldDetail

  constructor (timestamp: number, statusCode: number, title: string, detail: string, path: string, objects) {
    this.timestamp = timestamp
    this.statusCode = statusCode
    this.title = title
    this.detail = detail
    this.path = path
    this.objects = objects
  }
}

export class ErrorDetail
  extends PickType(ErrorDetailField, ['timestamp', 'statusCode', 'title', 'detail', 'path'] as const) {

}
