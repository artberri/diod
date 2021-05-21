import { Service } from '../../src/decorators'

@Service()
export class Clock {
  public readonly rand = Math.random()

  public now(): string {
    const currentDate = new Date()

    return `${currentDate.getMinutes()}:${currentDate.getSeconds()}`
  }
}
