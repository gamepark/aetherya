/** @jsxImportSource @emotion/react */
import { AetheryaRules } from '@gamepark/aetherya/AetheryaRules'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const PrepareGameHeader = () => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const activePlayers = useRules<AetheryaRules>()?.game.rule?.players
  const player = usePlayerName(activePlayers![0])

  if (playerId !== undefined && activePlayers!.includes(playerId)) {
    return <>{t('header.place-central-cards.you')}</>
  } else {
    return <>{t('header.place-central-cards.player', { player })}</>
  }
}
