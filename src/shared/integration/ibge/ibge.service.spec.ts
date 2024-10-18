import { HttpModule } from '@nestjs/axios'
import { Test, type TestingModule } from '@nestjs/testing'
import { IbgeService } from './ibge.service'
describe('IbgeService', () => {
  let service: IbgeService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IbgeService],
      imports: [HttpModule]
    }).compile()

    service = module.get<IbgeService>(IbgeService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should be return a list of city filter by state', async () => {
    const result = await service.findCitiesByState({ uf: 'AC', city: '' })
    expect(result.cities).toEqual(expect.arrayContaining(['Acrelândia']))
  }, 7000)

  it('should return a empty list if state not found', async () => {
    const result = await service.findCitiesByState({ uf: 'JJ', city: '' })
    expect(result.cities.length).toBe(0)
  })
})
