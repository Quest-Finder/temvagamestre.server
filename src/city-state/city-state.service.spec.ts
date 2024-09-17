import { type IbgeCityServiceReponse, IbgeService } from '@/shared/integration/ibge/ibge.service'
import { Test, type TestingModule } from '@nestjs/testing'
import { CityStateService } from './city-state.service'

class MockIbgeService {
  async findCitiesByState (state: string): Promise<IbgeCityServiceReponse> {
    return {
      cities: ['Rio de Janeiro', 'Cabo Frio', 'Rio das Ostras'],
      cityFounded: true
    }
  }
}

describe('CityStateService', () => {
  let service: CityStateService
  let ibgeService: IbgeService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityStateService,
        {
          provide: IbgeService,
          useClass: MockIbgeService
        }

      ]
    }).compile()

    service = module.get<CityStateService>(CityStateService)
    ibgeService = module.get<IbgeService>(IbgeService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(ibgeService).toBeDefined()
  })

  it('should return a empty list when state not exits', async () => {
    jest.spyOn(ibgeService, 'findCitiesByState').mockResolvedValueOnce({ cities: [], cityFounded: true })
    const result = await service.create({ uf: 'wong_state', city: '' })
    expect(result.length).toBe(0)
  })

  it('should return a list with cities', async () => {
    const result = await service.create({ uf: 'rj', city: '' })
    expect(result.length).not.toBe(0)
    expect(result).toEqual(expect.arrayContaining([
      'Rio de Janeiro', 'Cabo Frio', 'Rio das Ostras'
    ]))
  })
})
