import { formatDateStringToDateTime } from './format-date-string-to-date-time'

describe('formatDateStringToDateTime()', () => {
  it('Should return Date formated', async () => {
    const sut = formatDateStringToDateTime('12-31-2000')
    expect(sut).toBeInstanceOf(Date)
    expect(sut.toISOString()).toEqual('2000-12-31T02:00:00.000Z')
  })
})
