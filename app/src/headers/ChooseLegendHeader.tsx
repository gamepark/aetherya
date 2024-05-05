/** @jsxImportSource @emotion/react */
import { AetheryaRules } from '@gamepark/aetherya/AetheryaRules'
import { isCustomMoveType } from '@gamepark/rules-api'
import { CustomMoveType } from '@gamepark/aetherya/rules/CustomMoveType'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'

export const ChooseLegendHeader = () => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const activePlayer = useRules<AetheryaRules>()?.game.rule?.player
  const player = usePlayerName(activePlayer)
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  if (playerId !== undefined && activePlayer==playerId) {
    return <Trans defaults="header.pick-legend-or-pass.you"><PlayMoveButton move={pass}/></Trans>
  } else {
    return <>{t('header.pick-legend-or-pass.player', { player })}</>
  }
}
