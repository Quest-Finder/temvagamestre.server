import * as uuid from 'uuid'
import { UuidAdapter } from './uuid-adapter'

jest.mock('uuid')

describe('Uuid Adapter', () => {
  beforeAll(() => {
    jest.spyOn(uuid, 'v4').mockReturnValue('any_id')
  })

  describe('build()', () => {
    it('Should call uuid v4', () => {
      const sut = new UuidAdapter()
      const v4Spy = jest.spyOn(uuid, 'v4')
      sut.build()
      expect(v4Spy).toHaveBeenCalledTimes(1)
    })

    it('Should return an ID if uuid v4 is a success', () => {
      const sut = new UuidAdapter()
      const id = sut.build()
      expect(id).toBe('any_id')
    })
  })
})
