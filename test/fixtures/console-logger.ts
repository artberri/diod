import { Logger } from './logger'

export class ConsoleLogger implements Logger {
  public info(message: string): void {
    console.log(message)
  }
}
