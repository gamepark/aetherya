import { isSelectItemType, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { KingdomCard } from '../material/KingdomCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { AcquireLegendRule } from './AcquireLegendRule'
import { RuleId } from './RuleId'

export class PlaceDiscardCardRule extends AcquireLegendRule {
  getPlayerMoves(): MaterialMove[] {
    // Option 1 - acquire legend cards
    const moves: MaterialMove[] = super.getPlayerMoves()

    // Option 2 - move the discard card into the board
    const discardCard = this.discardDeckCards()
      .maxBy(item => item.location.x!)
    if (discardCard.length === 0) return []
    const discardCardId = discardCard.getItem()!.id

    const replaceableCards = this.material(MaterialType.KingdomCard)
      .location(LocationType.PlayerBoard)
      .player(this.player)
      .filter(item =>
        item.id === undefined || !item.location.rotation ||
        (item.id !== KingdomCard.Portal && item.id !== KingdomCard.Dragon && item.id !== discardCardId)
      )
      .getItems()

    for (const card of replaceableCards) {
      moves.push(discardCard.moveItem({
        type: LocationType.PlayerBoard,
        player: this.player, x: card.location.x, y: card.location.y, rotation: true
      }))
    }

    // Option 3 - Skip the discard card and reveal a hidden board card
    // This option is not available through inheritance, as it requires to draw a deck card first
    if (this.game.rule!.id === RuleId.PlaceDiscardCard){
      moves.push(...this.material(MaterialType.KingdomCard)
        .location(LocationType.PlayerBoard)
        .player(this.player)
        .filter(item => item.id === undefined || !item.location.rotation)
        .selectItems())
    }

    return moves
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
    if (isSelectItemType(MaterialType.KingdomCard)(move)) {
      const cards = this.material(MaterialType.KingdomCard).selected()
      cards.getItems().forEach(card => { delete card.selected })

      // Use the acquire legend rule to check game over conditions
      // and move to next player's turn if needed
      return [
        ...cards.moveItems({ rotation:true }),
        this.rules().startRule(RuleId.AcquireLegend)
      ]
    }
    return super.afterItemMove(move)
  }

  discardDeckCards() {
    return this.material(MaterialType.KingdomCard)
      .location(LocationType.KingdomDiscard)
  }
}
