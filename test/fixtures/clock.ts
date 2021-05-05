import { Service } from '../../src/decorators'

@Service()
export class Clock {
  public now(): string {
    const currentDate = new Date()

    return `${currentDate.getMinutes()}:${currentDate.getSeconds()}`
  }
}
