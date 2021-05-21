import { Service } from '../../src/decorators'
import { HelloSayer } from './hello-sayer'

@Service()
export class Person extends HelloSayer {
  public readonly rand = Math.random()

  public hasNose(): boolean {
    return true
  }
}
