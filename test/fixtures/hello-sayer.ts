import { Service } from '../../src/decorators'
import { ConsoleLogger } from './console-logger'
import { Sayer } from './sayer'

@Service()
class OtherSayer {
  public constructor(protected readonly logger: ConsoleLogger) {}
}

@Service()
export abstract class HelloSayer extends OtherSayer implements Sayer {
  public say(): void {
    this.logger.info('hello')
  }
}
