import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { KingdomCard } from '../material/KingdomCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { AcquireLegendRule } from './AcquireLegendRule'
import { RuleId } from './RuleId'

export class PlaceDiscardCardRule extends AcquireLegendRule {
  getPlayerMoves(): MaterialMove[] {
    // Card from the discard
    const discardCardActions: MaterialMove[] = []
    const discardCards = this.discardDeckCards()
      .maxBy(item => item.location.x!)
    const discardCardItems = discardCards.getItems()
    if (discardCardItems.length == 0) return []
    let discardCard = discardCardItems[0]
    let discardCardId = discardCard.id

    this.material(MaterialType.KingdomCard)
      .location(LocationType.PlayerBoard)
      .player(this.player)
      .filter(item =>
        item.id === undefined || !item.location.rotation ||
        (item.id != KingdomCard.Portal && item.id != KingdomCard.Dragon && item.id != discardCardId)
      )
      .getItems()
      .forEach(item => {
        discardCardActions.push(...discardCards.moveItems(
          {
            type: LocationType.PlayerBoard,
            player: this.player, x: item.location.x, y: item.location.y, rotation: true
          }))
      })

    return [
      ...discardCardActions,
      ...super.getPlayerMoves()
    ]
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.KingdomCard)(move)) {
      if (move.location.type === LocationType.PlayerBoard) {
        const boardCard = this.material(MaterialType.KingdomCard)
          .location(l => l.type === LocationType.PlayerBoard && l.player === this.player && l.x === move.location.x && l.y === move.location.y)
        return [
          boardCard.moveItem({ type: LocationType.KingdomDiscard, rotation: true }),
          this.rules().startRule(RuleId.AcquireLegend)
        ]
      }
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const consequences = super.afterItemMove(move)
    if (isMoveItemType(MaterialType.KingdomCard)(move) && move.location.type === LocationType.KingdomDiscard && this.kingdomDeckCards().length === 0) {
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
}
