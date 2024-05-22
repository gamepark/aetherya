import { isMoveItemType, ItemMove, MaterialMove, RuleMove } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { PlaceDiscardCardRule } from './PlaceDiscardCardRule'
import { RuleId } from './RuleId'

export class DrawOrPlaceDiscardCardRule extends PlaceDiscardCardRule {
  onRuleStart(move: RuleMove): MaterialMove[] {
    this.forget(Memory.PickedLegend)
    return super.onRuleStart(move)
  }

  getPlayerMoves(): MaterialMove[] {
    const moves = super.getPlayerMoves()
    moves.push(this.kingdomDeckCards()
      .maxBy(item => item.location.x!)
      .moveItem({ type: LocationType.KingdomDiscard, rotation: true }))
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    const consequences = super.beforeItemMove(move)
    if (isMoveItemType(MaterialType.KingdomCard)(move) && move.location.type === LocationType.KingdomDiscard) {
      const movedCard = this.material(MaterialType.KingdomCard).getItem(move.itemIndex)!
      if (movedCard.location.type === LocationType.KingdomDeck) {
        consequences.push(this.rules().startRule(RuleId.PlaceDiscardCard))
      }
    }
    return consequences
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const consequences = super.afterItemMove(move)
    if (isMoveItemType(MaterialType.KingdomCard)(move) && this.kingdomDeckCards().length === 0) {
      const discardCardsBeforeMove = this.discardDeckCards().index(index => index !== move.itemIndex)
      return [
        discardCardsBeforeMove.moveItemsAtOnce({ type: LocationType.KingdomDeck }),
        discardCardsBeforeMove.shuffle()
      ]
    }
    return consequences
  }

  kingdomDeckCards() {
    return this.material(MaterialType.KingdomCard)
      .location(LocationType.KingdomDeck)
  }
}
