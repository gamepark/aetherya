/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/aetherya/rules/RuleId'
import { ComponentType } from 'react'
import { ChooseCardHeader } from './ChooseCardHeader'
import { ChooseBoardLocationHeader } from './ChooseBoardLocationHeader'
import { PrepareGameHeader } from './PrepareGameHeader'
import { RevealAllBoardCardsHeader } from './RevealAllBoardCardsHeader'
import { ScoreHeader } from './ScoreHeader'
import { ErrorHeader } from './ErrorHeader'
import { OkHeader } from './OkHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.PrepareGame]: PrepareGameHeader,
  [RuleId.ChooseCard]: ChooseCardHeader,
  [RuleId.ChooseBoardLocation]: ChooseBoardLocationHeader,
  [RuleId.RevealAllBoardCards]: RevealAllBoardCardsHeader,
  [RuleId.Score]: ScoreHeader,

  // For debugging only
  [RuleId.Ok]: OkHeader,
  [RuleId.Error]: ErrorHeader
}
