/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/aetherya/rules/RuleId'
import { ComponentType } from 'react'
import { AcquireLegendHeader } from './AcquireLegendHeader'
import { ChooseCardHeader } from './ChooseCardHeader'
import { PlaceDiscardHeader } from './PlaceDiscardHeader'
import { PrepareGameHeader } from './PrepareGameHeader'
import { RevealAllBoardCardsHeader } from './RevealAllBoardCardsHeader'
import { ScoreHeader } from './ScoreHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.PrepareGame]: PrepareGameHeader,
  [RuleId.DrawOrPlaceDiscardCard]: ChooseCardHeader,
  [RuleId.PlaceDiscardCard]: PlaceDiscardHeader,
  [RuleId.AcquireLegend]: AcquireLegendHeader,
  [RuleId.RevealAllBoardCards]: RevealAllBoardCardsHeader,
  [RuleId.Score]: ScoreHeader,
}
