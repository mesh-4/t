import { cache } from 'react'
import { createIntl, createIntlCache } from '@formatjs/intl'
import { headers } from 'next/headers'

import { CUSTOM_HEADER_KEY } from '../constants'
import { dictionaries } from './dict'

export const getDict = async (locale: string) => dictionaries[locale as keyof typeof dictionaries]()

const intlCache = createIntlCache()

import 'server-only'

export const useIntl = cache(async () => {
	const lang = headers().get(CUSTOM_HEADER_KEY)!
	const dict = await getDict(lang)

	return createIntl(
		{
			locale: lang,
			messages: dict,
		},
		intlCache
	)
})
