import { Service } from '../../src/decorators'

export abstract class BaseRoute {
	public constructor(private readonly route: string) {}
	public getRoute(): string {
		return this.route
	}
}

@Service()
export class Routes extends BaseRoute {
	public constructor() {
		super('aRoute')
	}
}
