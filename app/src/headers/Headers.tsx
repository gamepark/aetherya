/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/aetherya/rules/RuleId'
import { ComponentType } from 'react'
//import { ChooseBoardLocationHeader } from './ChooseBoardLocationHeader'
import { ChooseCardHeader } from './ChooseCardHeader'
//import { ChooseLegendHeader } from './ChooseLegendHeader'
import { PrepareGameHeader } from './PrepareGameHeader'
import { RevealAllBoardCardsHeader } from './RevealAllBoardCardsHeader'
import { ScoreHeader } from './ScoreHeader'
import { ShuffleKingdomDeckHeader } from './ShuffleKingdomDeckHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.PrepareGame]: PrepareGameHeader,
  [RuleId.ChooseCard]: ChooseCardHeader,
//  [RuleId.ChooseBoardLocation]: ChooseBoardLocationHeader,
  [RuleId.RevealAllBoardCards]: RevealAllBoardCardsHeader,
  [RuleId.Score]: ScoreHeader,
  [RuleId.ShuffleKingdomDeck]: ShuffleKingdomDeckHeader,
//  [RuleId.ChooseLegend]: ChooseLegendHeader
}
