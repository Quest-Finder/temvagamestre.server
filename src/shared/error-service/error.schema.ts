import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { type HydratedDocument } from 'mongoose'

export type ErrorLogDocument = HydratedDocument<ErrorLog>

@Schema()
export class ErrorLog {
  @Prop()
    stack: string

  @Prop()
    date: number

  @Prop()
    origin: string
}

export const ErrorLogSchema = SchemaFactory.createForClass(ErrorLog)
