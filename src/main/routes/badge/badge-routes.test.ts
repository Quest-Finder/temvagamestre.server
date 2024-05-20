import { Test, type TestingModule } from '@nestjs/testing'
import { BadgeRoutesController } from './badge-routes'

describe('BadgeRoutesController', () => {
  let controller: BadgeRoutesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BadgeRoutesController]
    }).compile()

    controller = module.get<BadgeRoutesController>(BadgeRoutesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
