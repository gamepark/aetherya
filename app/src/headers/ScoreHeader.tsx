/** @jsxImportSource @emotion/react */
import { useTranslation } from 'react-i18next'

export const ScoreHeader = () => {
  const { t } = useTranslation()
  return <>{t('header.scoring')}</>
}
