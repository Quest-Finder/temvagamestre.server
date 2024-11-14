import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ErrorLog } from './error.schema'

type ErrorInput = {
  stack: string
  origin: string
}

@Injectable()
export class ErrorService {
  constructor (@InjectModel(ErrorLog.name) private readonly catModel: Model<ErrorLog>) { }

  async save ({ origin, stack }: ErrorInput): Promise<void> {
    /* eslint new-cap: "off" */
    const error = new this.catModel({
      date: new Date(),
      origin,
      stack
    })
    await error.save()
  }
}
