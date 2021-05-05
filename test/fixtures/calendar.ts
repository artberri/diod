import { Service } from '../../src/decorators'

Service()
export class Calendar {
  public now(): string {
    const currentDate = new Date()
    const month = currentDate.getUTCMonth() + 1
    const day = currentDate.getUTCDate()
    const year = currentDate.getUTCFullYear()

    return `${year}/${month}/${day}`
  }
}
