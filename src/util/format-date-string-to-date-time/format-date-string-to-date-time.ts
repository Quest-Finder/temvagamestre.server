export const formatDateStringToDateTime = (dateString: string): Date => {
  const [month, day, year] = dateString.split('-')
  const formattedDate = new Date(`${year}-${month}-${day}T00:00:00.000Z`)
  return formattedDate
}
