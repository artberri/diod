import { Service } from '../../src/decorators'
import { Logger } from './logger'
import { Sayer } from './sayer'

@Service()
class OtherSayer {
  public constructor(protected readonly logger: Logger) {}
}

@Service()
export abstract class HelloSayer extends OtherSayer implements Sayer {
  public say(): void {
    this.logger.info('hello')
  }
}
