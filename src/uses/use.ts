import { BuildOptions, ServiceData } from '../types'

export abstract class Use<T> {
  protected abstract build(options: BuildOptions): ServiceData<T>
}
