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
  private readonly buildables = new Map<
    Identifier<unknown>,
    Buildable<Registration<unknown>, unknown>
  >()

  public register<T>(identifier: Identifier<T>): Registration<T> {
    if (this.buildables.has(identifier)) {
      throw new Error(
        `A service identified as ${identifier.name} has been already registered. You need to unregister it before you can register it again.`
      )
    }

    const buildable = Registration.createBuildable(identifier)
    this.buildables.set(identifier, buildable)
    return buildable.instance
  }

  public unregister<T>(identifier: Identifier<T>): void {
    if (!this.buildables.has(identifier)) {
      throw new Error(`There is no service registered as ${identifier.name}.`)
    }

    this.buildables.delete(identifier)
  }

  public isRegistered<T>(identifier: Identifier<T>): boolean {
    return this.buildables.has(identifier)
  }

  public registerAndUse<T>(newable: Newable<T>): UseClass<T> {
    return this.register(newable).use(newable)
  }

  public build(options: BuildOptions = {}): Container {
    options.autowire = options.autowire ?? true
    const services = new Map<Identifier<unknown>, ServiceData<unknown>>()
    for (const [identifier, buildable] of this.buildables) {
      const data = buildable.build(options)
      services.set(identifier, data)
    }
    verify(services)
    return new Container(services)
  }
}
