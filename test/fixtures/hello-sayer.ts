import { Service } from '../../src/decorators'
import { Logger } from './logger'
import { Sayer } from './sayer'

@Service()
export class OtherSayer implements Sayer {
  public readonly rand = Math.random()
  public constructor(protected readonly logger: Logger) {}
  public say(): void {
    this.logger.info('OtherSayer')
  }
}

@Service()
export abstract class HelloSayer extends OtherSayer implements Sayer {
  abstract rand: number
  public say(): void {
    this.logger.info('hello')
  }
}
