import { Container } from './container'
import { Registration } from './registration'
import {
  Buildable,
  BuildOptions,
  Identifier,
  Newable,
  ServiceData,
} from './types'
import { UseClass } from './uses/use-class'
import { verify } from './verifier'

export class ContainerBuilder {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly buildables = new Set<
    Buildable<Registration<unknown>, unknown>
  >()

  public register<T>(identifier: Identifier<T>): Registration<T> {
    const buildable = Registration.createBuildable(identifier)
    this.buildables.add(buildable)
    return buildable.instance
  }

  public registerAndUse<T>(newable: Newable<T>): UseClass<T> {
    return this.register(newable).use(newable)
  }

  public build(options: BuildOptions = {}): Container {
    options.autowire = options.autowire ?? true
    const services = new Map<Identifier<unknown>, ServiceData<unknown>>()
    for (const buildable of this.buildables) {
      const data = buildable.build(options)
      services.set(buildable.instance.identifier, data)
    }
    verify(services)
    return new Container(services)
  }
}
