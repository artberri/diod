import { ServiceData } from '../internal-types'
import { BuildOptions } from '../types'

export abstract class Use<T> {
  protected abstract build(options: BuildOptions): ServiceData<T>
}
