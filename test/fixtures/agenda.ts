import { Service } from '../../src/decorators'
import { Calendar } from './calendar'
import { Clock } from './clock'

@Service()
export class Agenda {
  public readonly rand = Math.random()

  public constructor(
    private readonly clock: Clock,
    private readonly calendar: Calendar
  ) {}

  public now(): string {
    return `${this.calendar.now()}-${this.clock.now()}`
  }
}
