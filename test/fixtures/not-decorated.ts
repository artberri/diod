import { ConsoleLogger } from './console-logger'

export class NotDecorated {
	public constructor(private readonly logger: ConsoleLogger) {}

	public log(): void {
		this.logger.info('something')
	}
}
