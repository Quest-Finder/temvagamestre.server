import createApp from './configs/app'

async function bootstrap (): Promise<void> {
  const app = await createApp()
  await app.listen(3000)
}

bootstrap()
  .catch(console.error)
