import 'reflect-metadata'
import { expect, test, vi } from 'vitest'
import { ContainerBuilder } from '../src/diod'
import { ConsoleLogger } from './fixtures/console-logger'
import { Conversation } from './fixtures/conversation'
import { Logger } from './fixtures/logger'
import { Person } from './fixtures/person'
import { Sayer } from './fixtures/sayer'

test('the constructor of the extended class is injected if target has not constructor', () => {
	vi.spyOn(console, 'log').mockReturnValue(undefined)

	// Arrange
	const builder = new ContainerBuilder()
	builder.registerAndUse(Person)
	builder.register(Logger).use(ConsoleLogger)
	const container = builder.build()

	// Act
	const person = container.get(Person)

	// Assert
	expect(person.constructor.name).toBe('Person')
	expect(() => person.say()).not.toThrow()
})

test('abstractions can be used as identifiers but concrete class instances are recovered', () => {
	vi.spyOn(console, 'log').mockReturnValue(undefined)

	// Arrange
	const builder = new ContainerBuilder()
	builder.register(Sayer).use(Person)
	builder.register(Logger).use(ConsoleLogger)
	builder.registerAndUse(Conversation)
	const container = builder.build()

	// Act
	const sayer = container.get(Sayer)

	// Assert
	expect(sayer.constructor.name).toBe('Person')
	expect(() => sayer.say()).not.toThrow()
})
