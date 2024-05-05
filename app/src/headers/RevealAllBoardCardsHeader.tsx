/** @jsxImportSource @emotion/react */
import { useTranslation } from 'react-i18next'

export const RevealAllBoardCardsHeader = () => {
  const { t } = useTranslation()
  return <>{t('header.revealed-cards')}</>
}
