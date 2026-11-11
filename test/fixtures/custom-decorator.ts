export const MyAppService = (): ClassDecorator => {
	// oxlint-disable-next-line typescript/no-unsafe-function-type -- must match the TypeScript ClassDecorator signature, which uses Function
	return <TFunction extends Function>(target: TFunction): TFunction => {
		return target
	}
}
