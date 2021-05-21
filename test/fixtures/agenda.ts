import { Service } from '../../src/decorators'
import { Calendar } from './calendar'
import { Clock } from './clock'

@Service()
export class Agenda {
  public readonly rand = Math.random()

  public constructor(
    public readonly clock: Clock,
    private readonly calendar: Calendar
  ) {}

  public now(): string {
    return `${this.calendar.nowCalendar()}-${this.clock.now()}`
  }
}
