import 'reflect-metadata'
import { expect, test } from 'vitest'
import { ContainerBuilder } from '../src/diod'
import { AutoRegisteredServiceSample } from './fixtures/autoregistered-services'
import { autoregister } from './fixtures/register-service-decorator'

test('autoregisters classes with custom decorator', () => {
	// Act
	const builder = new ContainerBuilder()
	autoregister(builder)
	const container = builder.build()

	// Assert
	const service = container.get(AutoRegisteredServiceSample)
	expect(service.constructor.name).toBe('AutoRegisteredServiceSample')
	expect(service.now()).not.toBe('')
})
