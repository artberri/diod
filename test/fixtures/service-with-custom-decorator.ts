import { MyAppService } from './custom-decorator'
import { Truer } from './truer'

@MyAppService()
export class ServiceWithCustomDecorator {
  public constructor(protected readonly truer: Truer) {}

  public execDep(): boolean {
    return this.truer.returnTrue()
  }
}
