import * as circular1 from './circular1'

export class Circular1 {
	public constructor(public readonly circular: Circular2) {}
}

export class Circular2 {
	public constructor(public readonly circular: circular1.Circular1) {}
}
