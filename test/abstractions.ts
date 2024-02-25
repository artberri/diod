import 'reflect-metadata'
import tap from 'tap'
import { ContainerBuilder } from '../src/diod'
import { ConsoleLogger } from './fixtures/console-logger'
import { Conversation } from './fixtures/conversation'
import { Logger } from './fixtures/logger'
import { Person } from './fixtures/person'
import { Sayer } from './fixtures/sayer'

void tap.test(
	'the constructor of the extended class is injected if target has not constructor',
	(t) => {
		// Arrange
		const builder = new ContainerBuilder()
		builder.registerAndUse(Person)
		builder.register(Logger).use(ConsoleLogger)
		const container = builder.build()

		// Act
		const person = container.get(Person)

		// Assert
		t.equal(person.constructor.name, 'Person')
		t.doesNotThrow(() => person.say())
		t.end()
	},
)

void tap.test(
	'abstractions can be used as identifiers but concrete class instances are recovered',
	(t) => {
		// Arrange
		const builder = new ContainerBuilder()
		builder.register(Sayer).use(Person)
		builder.register(Logger).use(ConsoleLogger)
		builder.registerAndUse(Conversation)
		const container = builder.build()

		// Act
		const sayer = container.get(Sayer)

		// Assert
		t.equal(sayer.constructor.name, 'Person')
		t.doesNotThrow(() => sayer.say())
		t.end()
	},
)
