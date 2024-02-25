import { Service } from '../../src/decorators'
import { NotDecorated } from './not-decorated'

@Service()
export class NotPerson extends NotDecorated {
	public hasNose(): boolean {
		return false
	}
}
