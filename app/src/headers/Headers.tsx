/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/aetherya/rules/RuleId'
import { ComponentType } from 'react'
import { ChooseLegendaryCardHeader } from './ChooseLegendaryCardHeader'
import { ChooseBoardLocationHeader } from './ChooseBoardLocationHeader'
import { RevealAllBoardCardsHeader } from './RevealAllBoardCardsHeader'
import { ScoreHeader } from './ScoreHeader'
import { ErrorHeader } from './ErrorHeader'
import { OkHeader } from './OkHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.ChooseLegendaryCard]: ChooseLegendaryCardHeader,
  [RuleId.ChooseBoardLocation]: ChooseBoardLocationHeader,
  [RuleId.RevealAllBoardCards]: RevealAllBoardCardsHeader,
  [RuleId.Score]: ScoreHeader,

  // For debugging only
  [RuleId.Ok]: OkHeader,
  [RuleId.Error]: ErrorHeader
}
