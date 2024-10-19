import { HttpService } from '@nestjs/axios'
import { Test, type TestingModule } from '@nestjs/testing'
import { of } from 'rxjs'
import { IbgeService } from './ibge.service'

class MockHttpService {
  get (): any {
    return of({
      data: [
        { nome: 'Acrelândia' }
      ]
    })
  }
}

describe('IbgeService', () => {
  let service: IbgeService
  let httpService: HttpService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IbgeService,
        {
          provide: HttpService,
          useClass: MockHttpService
        }
      ],
      imports: []
    }).compile()
    httpService = module.get<HttpService>(HttpService)
    service = module.get<IbgeService>(IbgeService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should be return a list of city filter by state', async () => {
    const result = await service.findCitiesByState({ uf: 'AC', city: '' })
    expect(result.cities).toEqual(expect.arrayContaining(['Acrelândia']))
  })

  it('should return a empty list if state not found', async () => {
    jest.spyOn(httpService, 'get').mockReturnValue(of({ data: [] }))
    const result = await service.findCitiesByState({ uf: 'JJ', city: '' })
    expect(result.cities.length).toBe(0)
  })
})
