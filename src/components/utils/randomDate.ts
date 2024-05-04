export function generateRandomDate() {
  const today = new Date()
  const currentYear = today.getFullYear()

  const randomDay = Math.floor(Math.random() * 365) + 1

  const randomDate = new Date(`${currentYear}-01-01`)
  randomDate.setDate(randomDate.getDate() + randomDay)

  const year = randomDate.getFullYear()
  let month = randomDate.getMonth() + 1
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  month = month < 10 ? `0${month}` : month as any
  let day = randomDate.getDate()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  day = day < 10 ? `0${day}` : day as any

  return `${day}-${month}-${year}`
}