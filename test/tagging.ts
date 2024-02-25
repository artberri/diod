import 'reflect-metadata'
import tap from 'tap'
import { ContainerBuilder, Identifier } from '../src/diod'
import { Agenda } from './fixtures/agenda'
import { Calendar } from './fixtures/calendar'
import { Clock } from './fixtures/clock'
import { ConsoleLogger } from './fixtures/console-logger'
import { OtherSayer } from './fixtures/hello-sayer'
import { Logger } from './fixtures/logger'
import { MultiAgenda } from './fixtures/multi-agenda'
import { Person } from './fixtures/person'
import { Sayer } from './fixtures/sayer'

void tap.test('service identifiers can be get based on tag', (t) => {
	// Arrange
	const builder = new ContainerBuilder()

	// Act
	builder.registerAndUse(Calendar).addTag('tag1').addTag('calendar')
	builder
		.register(Clock)
		.useFactory(() => new Clock())
		.addTag('tag1')
		.addTag('tag2')
		.addTag('clock')
	builder
		.register(Sayer)
		.useInstance(new Person(new ConsoleLogger()))
		.addTag('tag2')
		.addTag('sayer')
	builder.register(Logger).use(ConsoleLogger).addTag('logger')
	builder.registerAndUse(OtherSayer).addTag('sayer')
	builder
		.register(Agenda)
		.useFactory((c) => {
			const clockIds = c.findTaggedServiceIdentifiers<Clock>('clock')
			const calendarIds = c.findTaggedServiceIdentifiers<Clock>('calendar')
			return new Agenda(
				c.get(clockIds[0] as Identifier<Clock>),
				c.get(calendarIds[0] as Identifier<Calendar>),
			)
		})
		.addTag('tag1')
	builder.registerAndUse(MultiAgenda).addTag('tag3')
	const container = builder.build()

	// Assert
	const serviceIdentifiersTaggedWithTag1 =
		container.findTaggedServiceIdentifiers('tag1')
	const sayerIdentifiers =
		container.findTaggedServiceIdentifiers<Sayer>('sayer')
	const sayers = sayerIdentifiers.map((id) => container.get(id))
	const agenda = container.get(Agenda)
	t.equal(serviceIdentifiersTaggedWithTag1.length, 3)
	t.equal(sayers.length, 2)
	t.not(sayers[0]?.rand, undefined)
	t.not(sayers[1]?.rand, undefined)
	t.not(agenda.now(), '')
	t.end()
})
