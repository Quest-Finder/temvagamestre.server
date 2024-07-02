import type { EnvironmentContext, JestEnvironmentConfig } from '@jest/environment'
import { execSync } from 'child_process'
import { resolve } from 'path'
import { Client } from 'pg'
import dotenv from 'dotenv'
import NodeEnvironment from 'jest-environment-node'

dotenv.config({
  path: resolve(__dirname, '../../../../../.env')
})

const baseUrl = process.env.DATABASE_TEST_URL
class CustomEnvironment extends NodeEnvironment {
  private readonly schema: string | null = null
  private readonly connectionString: string | undefined = undefined

  constructor (config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context)
    const randomString = Math.random().toString().substring(2, 10)
    this.schema = `code_schema_${randomString}`
    this.connectionString = `${baseUrl}${this.schema}`
  }

  async setup (): Promise<void> {
    process.env.DATABASE_URL = this.connectionString
    this.global.process.env.DATABASE_URL = this.connectionString
    execSync('npx prisma migrate deploy')
  }

  async teardown (): Promise<void> {
    const client = new Client({
      connectionString: this.connectionString
    })
    await client.connect()
    await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`)
    await client.end()
  }
}

export default CustomEnvironment
