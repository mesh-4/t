import { useIntl } from '../server/intl'

type LocaleTextProps = {
	tid: string
	tdefault?: string
}

/**
 * It's only for server components.
 */
const LocaleText = async ({ tid, tdefault }: LocaleTextProps) => {
	const intl = await useIntl()

	return intl.formatMessage({ id: tid, defaultMessage: tdefault })
}

export default LocaleText
