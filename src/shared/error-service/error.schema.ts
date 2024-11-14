import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { type HydratedDocument } from 'mongoose'

export type ErrorLogDocument = HydratedDocument<ErrorLog>

@Schema()
export class ErrorLog {
  @Prop()
    stack: string

  @Prop()
    date: Date

  @Prop()
    origin: string

  constructor (stack: string, date: Date, origin: string) {
    this.date = date
    this.origin = origin
    this.stack = stack
  }
}

export const ErrorLogSchema = SchemaFactory.createForClass(ErrorLog)
