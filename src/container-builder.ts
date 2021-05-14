import { Container } from './container'
import { ClassRegistration } from './registrations/class-registration'
import { BuildableRegistration } from './registrations/registration'
import { Abstract, BuildOptions, Newable, ServiceData } from './types'
import { verify } from './verifier'

export class ContainerBuilder {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly buildables = new Set<BuildableRegistration<any, unknown>>()

  public register<T>(newable: Newable<T>): ClassRegistration<T> {
    const buildable = ClassRegistration.createBuildable(newable)
    this.buildables.add(buildable)
    return buildable.registration
  }

  public build(options: BuildOptions = {}): Container {
    options.autowire = options.autowire ?? true
    const services = new Map<Abstract<unknown>, ServiceData<unknown>>()
    for (const buildable of this.buildables) {
      const data = buildable.build(options)
      services.set(data.identifier, data)
    }
    verify(services)
    return new Container(services)
  }
}
