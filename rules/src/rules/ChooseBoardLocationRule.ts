import { isSelectItem, ItemMove, MaterialMove /*, PlayerTurnRule */ } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { KingdomCard } from '../material/KingdomCard'
import { Memory } from './Memory'
import { PlayerTurnRuleWithLegendMoves } from './PlayerTurnRuleWithLegendMoves'
import { RuleId } from './RuleId'

export class ChooseBoardLocationRule extends PlayerTurnRuleWithLegendMoves {
  getPlayerMoves() {
    let cardEvents=this.cardsFromEventArea.getItems()
    let eventCardId = cardEvents[0].id
    return this.material(MaterialType.KingdomCard)
      .location(LocationType.PlayerBoard)
      .player(this.player)
      .filter(item =>
        item.id===undefined || !item.location.rotation ||
        (item.id != KingdomCard.Portal && item.id != KingdomCard.Dragon && item.id != eventCardId )
      )
      .selectItems()
  }

  get cardsFromEventArea() {
    return this.material(MaterialType.KingdomCard).location(LocationType.EventArea)
  }

  get cardFromEventArea() {
    return this.material(MaterialType.KingdomCard).location(LocationType.EventArea).selected()
  }

  get cardFromPlayerBoard() {
    return this.material(MaterialType.KingdomCard).location(LocationType.PlayerBoard).player(this.player).selected()
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isSelectItem(move) && move.itemType === MaterialType.KingdomCard) {
      const eventCard = this.cardFromEventArea
      const boardCard = this.cardFromPlayerBoard
      const boardCardLocation = boardCard.getItem()!.location
      const newBoardCardLocation = { type:LocationType.PlayerBoard, player:boardCardLocation.player, x:boardCardLocation.x, y:boardCardLocation.y, rotation:true }

      // Unselect all cards
      this.material(MaterialType.KingdomCard).selected(true).getItems().forEach((item) => delete item.selected)

      // If the player already picked a legend card, it's the end of the turn
      // otherwise the player may pick a legend card
      let nextTurn=undefined

      if (this.remind(Memory.PickedLegend) || this.getPlayerLegendMovesAfterMove(eventCard, newBoardCardLocation).length==0){
        // Reset turn state for next player
        this.forget(Memory.PickedLegend)
        nextTurn=this.rules().startPlayerTurn(RuleId.ChooseCard, this.nextPlayer)
      } else {
        nextTurn=this.rules().startPlayerTurn(RuleId.ChooseLegend, this.getActivePlayer())
      }

      return [
        boardCard.moveItem({ type: LocationType.KingdomDiscard, rotation:true }),
        eventCard.moveItem(newBoardCardLocation),
        nextTurn
      ]
    }
    return []
  }
}
