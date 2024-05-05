/** @jsxImportSource @emotion/react */
import { useTranslation } from 'react-i18next'

export const ShuffleKingdomDeckHeader = () => {
  const { t } = useTranslation()
  return <>{t('header.refill-deck-and-discard')}</>
}
