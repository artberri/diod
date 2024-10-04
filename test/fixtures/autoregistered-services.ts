import { RegisterService } from './register-service-decorator'

@RegisterService()
export class AutoRegisteredDependencySample {
	public readonly rand = Math.random()

	public now(): string {
		const currentDate = new Date()

		return `${currentDate.getMinutes()}:${currentDate.getSeconds()}`
	}
}

@RegisterService()
export class AutoRegisteredServiceSample {
	public readonly rand = Math.random()

	public constructor(public readonly dep: AutoRegisteredDependencySample) {}

	public now(): string {
		return `${this.dep.now()}`
	}
}
