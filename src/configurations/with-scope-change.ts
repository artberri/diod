export interface WithScopeChange<T> {
  asTransient(): T
  asSingleton(): T
  asInstancePerRequest(): T
}
