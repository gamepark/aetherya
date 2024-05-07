import { PlayerTurnRule } from '@gamepark/rules-api'
//import { LocationType } from '../material/LocationType'
//import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class NextPlayerRule extends PlayerTurnRule {
  onRuleStart() {
    console.log("Next player")
    this.forget(Memory.PickedLegend)
    this.forget(Memory.PickedCardFromDeck)
    this.forget(Memory.PlacedBoardCard)
    return [this.rules().startPlayerTurn(RuleId.ChooseCard, this.nextPlayer)]
  }

  getPlayerMoves() {
    return []
  }
}
