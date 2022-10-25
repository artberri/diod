import { ServiceData } from '../internal-types'
import { ScopeType } from '../scope-type'
import { BuildOptions, ConfigurableRegistration } from '../types'

export abstract class ServiceConfiguration<T>
  implements ConfigurableRegistration
{
  protected abstract scope: ScopeType
  protected isPrivate = false
  protected tags: string[] = []

  public public(): this {
    this.isPrivate = false
    return this
  }

  public private(): this {
    this.isPrivate = true
    return this
  }

  public addTag(tag: string): this {
    this.tags = [...this.tags, tag]
    return this
  }

  protected abstract build(options: BuildOptions): ServiceData<T>

  protected asTransient(): this {
    this.scope = ScopeType.Transient
    return this
  }

  protected asSingleton(): this {
    this.scope = ScopeType.Singleton
    return this
  }

  protected asInstancePerRequest(): this {
    this.scope = ScopeType.Request
    return this
  }
}
