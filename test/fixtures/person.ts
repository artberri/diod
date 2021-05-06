import { Service } from '../../src/decorators'
import { HelloSayer } from './hello-sayer'

@Service()
export class Person extends HelloSayer {
  public hasNose(): boolean {
    return true
  }
}
