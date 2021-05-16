export const MyAppService = (): ClassDecorator => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return <TFunction extends Function>(target: TFunction): TFunction => {
    return target
  }
}
