/** @jsxImportSource @emotion/react */
import { AetheryaRules } from '@gamepark/aetherya/AetheryaRules'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const AcquireLegendHeader = () => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const activePlayer = useRules<AetheryaRules>()?.game.rule?.player
  const player = usePlayerName(activePlayer)

  if (playerId !== undefined && activePlayer === playerId) {
    return <>{t('header.acquire-legend.you')}</>
  } else {
    return <>{t('header.acquire-legend.player', { player })}</>
  }
}
