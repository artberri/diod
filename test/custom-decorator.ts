import 'reflect-metadata'
import { expect, test } from 'vitest'
import { ContainerBuilder } from '../src/diod'
import { OtherServiceWithCustomDecorator } from './fixtures/other-service-with-custom-decorator'
import { ServiceWithCustomDecorator } from './fixtures/service-with-custom-decorator'
import { Truer } from './fixtures/truer'

test('user defined decorators can be used', () => {
	// Arrange
	const builder = new ContainerBuilder()
	builder.registerAndUse(ServiceWithCustomDecorator)
	builder.register(Truer).use(OtherServiceWithCustomDecorator)
	const container = builder.build()

	// Act
	const service = container.get(ServiceWithCustomDecorator)

	// Assert
	expect(service.constructor.name).toBe('ServiceWithCustomDecorator')
	expect(service.execDep()).toBe(true)
})
