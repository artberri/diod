import { Service } from '../../src/decorators'
import { Sayer } from './sayer'

@Service()
export class Conversation {
  public constructor(
    private readonly sayer1: Sayer,
    private readonly sayer2: Sayer
  ) {}

  public talk(): void {
    this.sayer1.say()
    this.sayer2.say()
  }
}
