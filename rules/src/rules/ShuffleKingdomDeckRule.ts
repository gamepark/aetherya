import { isShuffle, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class ShuffleKingdomDeckRule extends PlayerTurnRule {
  onRuleStart() {
    const discardCards = this.discardDeckCards()
    return [
      discardCards.moveItemsAtOnce({ type: LocationType.KingdomDeck }),
      discardCards.shuffle(),
      ...this.kingdomDeck().deal({ type: LocationType.KingdomDiscard }, 1),
      this.rules().startPlayerTurn(RuleId.ChooseCard, this.getActivePlayer())
    ]
  }

  getPlayerMoves() {
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (!isShuffle(move)) {
      return []
    }
    return []
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
}
