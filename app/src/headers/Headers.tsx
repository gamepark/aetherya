/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/aetherya/rules/RuleId'
import { ComponentType } from 'react'
//import { ChooseBoardLocationHeader } from './ChooseBoardLocationHeader'
import { ChooseCardHeader } from './ChooseCardHeader'
//import { ChooseLegendHeader } from './ChooseLegendHeader'
import { PrepareGameHeader } from './PrepareGameHeader'
import { RevealAllBoardCardsHeader } from './RevealAllBoardCardsHeader'
import { ScoreHeader } from './ScoreHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.PrepareGame]: PrepareGameHeader,
  [RuleId.DrawOrPlaceDiscardCard]: ChooseCardHeader,
  [RuleId.PlaceDiscardCard]: ChooseCardHeader, // TODO: more specific header
  [RuleId.AcquireLegend]: ChooseCardHeader, // TODO: more specific header
//  [RuleId.ChooseBoardLocation]: ChooseBoardLocationHeader,
  [RuleId.RevealAllBoardCards]: RevealAllBoardCardsHeader,
  [RuleId.Score]: ScoreHeader,
//  [RuleId.ChooseLegend]: ChooseLegendHeader
}
