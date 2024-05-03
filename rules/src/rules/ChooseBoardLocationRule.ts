import { isSelectItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { KingdomCard } from '../material/KingdomCard'
import { RuleId } from './RuleId'

export class ChooseBoardLocationRule extends PlayerTurnRule {
  getPlayerMoves() {
    let eventCardId = this.cardsFromEventArea.getItems()[0].id
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

      return [
        boardCard.moveItem({ type: LocationType.KingdomDiscard, rotation:true }),
        eventCard.moveItem(newBoardCardLocation),

        this.rules().startPlayerTurn(RuleId.ChooseLegendaryCard, this.nextPlayer)

        // For score tests only
//        this.rules().startRule(RuleId.Score)
      ]
/*
    } else {
      console.log("Skipped move")
      console.log(move)
*/
    }
    return []
  }
}
