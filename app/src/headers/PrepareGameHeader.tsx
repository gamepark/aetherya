/** @jsxImportSource @emotion/react */
import { AetheryaRules } from '@gamepark/aetherya/AetheryaRules'
import { isCustomMoveType } from '@gamepark/rules-api'
import { CustomMoveType } from '@gamepark/aetherya/rules/CustomMoveType'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'

export const PrepareGameHeader = () => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const activePlayers = useRules<AetheryaRules>()?.game.rule?.players
  const player = usePlayerName(activePlayers![0])
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))

  if (playerId !== undefined && activePlayers!.includes(playerId)) {
    return <Trans defaults="header.swap-or-pass.you"><PlayMoveButton move={pass}/></Trans>
  } else {
    return <>{t('header.swap-or-pass.player', { player })}</>
  }
}
