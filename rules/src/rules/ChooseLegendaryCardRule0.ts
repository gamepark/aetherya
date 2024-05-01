import { CustomMove, /* isMoveItemType, ItemMove, */ MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { CustomMoveType } from './CustomMoveType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class ChooseLegendaryCardRule extends PlayerTurnRule {
  getPlayerMoves() {
    return [
      this.rules().customMove(CustomMoveType.DrawLegendaryCard)
    ]
  }

  onCustomMove(move: CustomMove) {
    const moves: MaterialMove[] = []
    if (move.type === CustomMoveType.DrawLegendaryCard) {
      return [
        ...this.drawLegendaryCard(),
        this.rules().startRule(RuleId.ChooseBoardLocation)
      ]
    }
    return moves
  }

  drawLegendaryCard(){
    const moves: MaterialMove[] = []
    const deck = this.material(MaterialType.KingdomCard)
      .location(LocationType.KingdomDeck)
      .deck()

    if (deck.length <= 0){
      const deck2 = this.material(MaterialType.KingdomCard)
        .location(LocationType.KingdomDiscard)
        .deck()
      moves.push(...deck2.deal({ type: LocationType.EventArea }, 1))
//      moves.push(deck2.deal({ type: LocationType.KingdomDeck }, 999))
    } else {
      moves.push(...deck.deal({ type: LocationType.EventArea }, 1))
    }
    return moves
  }

  /*
  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.LegendaryCard)(move)) return []

    return [
      this.rules().startRule(RuleId.Score),
    ]
  }
*/
}
