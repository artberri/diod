import { MyAppService } from './custom-decorator'
import { Truer } from './truer'

@MyAppService()
export class OtherServiceWithCustomDecorator implements Truer {
	public returnTrue(): true {
		return true
	}
}
