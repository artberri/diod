import { Abstract, BuildOptions, ServiceData } from '../types'

export type BuildableRegistration<TRegistration extends Registration<T>, T> = {
  registration: TRegistration
  build: (options: BuildOptions) => ServiceData<T>
}

export abstract class Registration<T> {
  protected identifier: Abstract<T> | undefined

  public as(identifier: Abstract<T>): this {
    this.identifier = identifier
    return this
  }

  protected abstract build(options: BuildOptions): ServiceData<T>
}
