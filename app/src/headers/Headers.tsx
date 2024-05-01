/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/aetherya/rules/RuleId'
import { ComponentType } from 'react'
import { ChooseLegendaryCardHeader } from './ChooseLegendaryCardHeader'
import { ChooseBoardLocationHeader } from './ChooseBoardLocationHeader'
import { RevealAllBoardCardsHeader } from './RevealAllBoardCardsHeader'
import { ScoreHeader } from './ScoreHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.ChooseLegendaryCard]: ChooseLegendaryCardHeader,
  [RuleId.ChooseBoardLocation]: ChooseBoardLocationHeader,
  [RuleId.RevealAllBoardCards]: RevealAllBoardCardsHeader,
  [RuleId.Score]: ScoreHeader
}
