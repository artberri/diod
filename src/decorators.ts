/**
 * Decorator for injectable classes. Every registered service must
 * decorated because without decorators Typescript won't emit
 * constructor metadata.
 * @returns
 */
export const Service = (): ClassDecorator => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return <TFunction extends Function>(target: TFunction): TFunction => {
    return target
  }
}
