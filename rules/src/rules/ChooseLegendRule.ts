import { CustomMove, /* isSelectItem, */ isMoveItem, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { CustomMoveType } from './CustomMoveType'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { PlayerTurnRuleWithLegendMoves } from './PlayerTurnRuleWithLegendMoves'
import { RuleId } from './RuleId'

export class ChooseLegendRule extends PlayerTurnRuleWithLegendMoves {
  onRuleStart() {
    if (this.getPlayerMoves().length==0){
      this.forget(Memory.PickedLegend)
      return [ this.rules().startPlayerTurn(RuleId.ChooseCard, this.nextPlayer) ]
    }
    return []
  }

  getPlayerMoves() {
    return [
      ...this.getPlayerLegendMoves(),
      this.rules().customMove(CustomMoveType.Pass)
    ]
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.Pass) {
      return [ this.rules().startPlayerTurn(RuleId.ChooseCard, this.nextPlayer) ]
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItem(move)){
      if (move.itemType==MaterialType.LegendCard){
        let moves:MaterialMove[]=this.refillLegendLineActions()
        moves.push(this.rules().startPlayerTurn(RuleId.ChooseCard, this.nextPlayer))

        return moves
      }
    }
    return []
  }

  drawKingdomCard(){
    return this.kingdomDeck().deal({ type: LocationType.EventArea }, 1)
  }

  kingdomDeckCards() {
    return this.material(MaterialType.KingdomCard)
      .location(LocationType.KingdomDeck)
  }

  kingdomDeck() {
    return this.kingdomDeckCards().deck()
  }

  discardDeckCards() {
    return this.material(MaterialType.KingdomCard)
      .location(LocationType.KingdomDiscard)
  }

  discardDeck() {
    return this.discardDeckCards().deck()
  }

  legendDeck() {
    return this.material(MaterialType.LegendCard)
      .location(LocationType.LegendDeck)
      .deck()
  }
}
