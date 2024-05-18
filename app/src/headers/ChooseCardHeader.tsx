/** @jsxImportSource @emotion/react */
import { AetheryaRules } from '@gamepark/aetherya/AetheryaRules'
import { AcquireLegendRule } from '@gamepark/aetherya/rules/AcquireLegendRule'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const ChooseCardHeader = () => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const rules=useRules<AetheryaRules>()
  const activePlayer = rules?.game.rule?.player
  const player = usePlayerName(activePlayer)

  const currentRule:AcquireLegendRule=rules?.rulesStep as AcquireLegendRule
  const availableLegendCards=currentRule.getPlayerLegendMoves().length>0

  if (playerId !== undefined && activePlayer === playerId) {
    if (availableLegendCards)
      return <>{t('header.choose-card-withLegend.you')}</>
    return <>{t('header.choose-card-withoutLegend.you')}</>
  } else {
    if (availableLegendCards)
      return <>{t('header.choose-card-withLegend.player', { player })}</>
    return <>{t('header.choose-card-withoutLegend.player', { player })}</>
  }
}
