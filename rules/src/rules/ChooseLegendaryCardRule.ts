import { isSelectItem, /* isMoveItemType, */ ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class ChooseLegendaryCardRule extends PlayerTurnRule {
  getPlayerMoves() {
    return [
      ...this.material(MaterialType.KingdomCard)
        .location(LocationType.KingdomDeck)
        .selectItems()
    ]
  }


  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isSelectItem(move)) {
      return [
        ...this.drawLegendaryCard(),
        this.rules().startRule(RuleId.ChooseBoardLocation)
      ]
    }
    return []
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
}