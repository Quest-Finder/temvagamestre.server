import type { EnvironmentContext, JestEnvironmentConfig } from '@jest/environment'
import { execSync } from 'child_process'
import { resolve } from 'path'
import { Client } from 'pg'
import dotenv from 'dotenv'
import NodeEnvironment from 'jest-environment-node'

dotenv.config({
  path: resolve(__dirname, '.env.test')
})

class CustomEnvironment extends NodeEnvironment {
  private static schema: string | null = null
  private static connectionString: string | undefined = undefined

  constructor (config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context)
    if (!CustomEnvironment.schema) {
      const randomString = Math.random().toString().substring(2, 10)
      CustomEnvironment.schema = `code_schema_${randomString}`
      CustomEnvironment.connectionString = `${process.env.DATABASE_URL}?schema=${CustomEnvironment.schema}`
    }
  }

  async setup (): Promise<void> {
    process.env.DATABASE_URL = CustomEnvironment.connectionString
    this.global.process.env.DATABASE_URL = CustomEnvironment.connectionString
    execSync('npx prisma db push')
  }

  async teardown (): Promise<void> {
    const client = new Client({
      connectionString: CustomEnvironment.connectionString
    })
    await client.connect()
    await client.query(`DROP SCHEMA IF EXISTS "${CustomEnvironment.schema}" CASCADE`)
    await client.end()
  }
}

export default CustomEnvironment
