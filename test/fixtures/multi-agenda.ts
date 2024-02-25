import { Service } from '../../src/decorators'
import { Agenda } from './agenda'
import { Clock } from './clock'

@Service()
export class MultiAgenda {
	public readonly rand = Math.random()

	public constructor(
		public readonly agenda1: Agenda,
		public readonly agenda2: Agenda,
		public readonly clock: Clock,
	) {}

	public now(): string {
		return `${this.agenda1.now()}-${this.agenda2.now()}-${this.clock.now()}`
	}
}
