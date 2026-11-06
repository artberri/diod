export const MyAppService = (): ClassDecorator => {
	// biome-ignore lint/complexity/noBannedTypes: must match the TypeScript ClassDecorator signature, which uses Function
	return <TFunction extends Function>(target: TFunction): TFunction => {
		return target
	}
}
