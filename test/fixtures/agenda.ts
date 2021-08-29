import { Service } from '../../src/decorators'
import { Calendar } from './calendar'
import { Clock } from './clock'

@Service()
export class Agenda {
  public readonly rand = Math.random()

  public constructor(
    public readonly clock: Clock,
    public readonly calendar: Calendar
  ) {}

  public now(): string {
    return `${this.calendar.nowCalendar()}-${this.clock.now()}`
  }
}

@Service()
export class Schedule {
  public constructor(public readonly calendar: Agenda) {}
}
