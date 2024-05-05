import { isSelectItem, ItemMove, MaterialMove /*, PlayerTurnRule */ } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { KingdomCard } from '../material/KingdomCard'
import { Memory } from './Memory'
import { PlayerTurnRuleWithLegendaryMoves } from './PlayerTurnRuleWithLegendaryMoves'
import { RuleId } from './RuleId'

export class ChooseBoardLocationRule extends PlayerTurnRuleWithLegendaryMoves {
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

      // If the player already picked a legendary card, it's the end of the turn
      // otherwise the player may pick a legendary card
      let nextTurn=undefined

      if (this.getPlayerMoves().length==0){
        this.forget(Memory.PickedLegendary)
        return [ this.rules().startPlayerTurn(RuleId.ChooseCard, this.nextPlayer) ]
      }

      if (this.remind(Memory.PickedLegendary) || this.getPlayerLegendaryMoves().length==0){
        // Reset turn state for next player
        this.forget(Memory.PickedLegendary)
        nextTurn=this.rules().startPlayerTurn(RuleId.ChooseCard, this.nextPlayer)
      } else {
        nextTurn=this.rules().startPlayerTurn(RuleId.ChooseLegendary, this.getActivePlayer())
      }

      return [
        boardCard.moveItem({ type: LocationType.KingdomDiscard, rotation:true }),
        eventCard.moveItem(newBoardCardLocation),
        nextTurn

//        this.rules().startPlayerTurn(RuleId.ChooseCard, this.nextPlayer)

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
