/** @jsxImportSource @emotion/react */
import { AetheryaRules } from '@gamepark/aetherya/AetheryaRules'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const PlaceDiscardHeader = () => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const rules = useRules<AetheryaRules>()
  const activePlayer = rules?.game.rule?.player
  const player = usePlayerName(activePlayer)

  if (playerId !== undefined && activePlayer === playerId) {
    return <>{t('header.place-discard.you')}</>
  } else {
    return <>{t('header.place-discard.player', { player })}</>
  }
}
