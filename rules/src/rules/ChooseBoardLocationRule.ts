import { isSelectItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class ChooseBoardLocationRule extends PlayerTurnRule {
  getPlayerMoves() {
    return this.material(MaterialType.KingdomCard)
      .location(LocationType.PlayerBoard)
      .player(this.player)
      .selectItems()
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
//      const eventCardLocation = eventCard.getItem()!.location
      const boardCard = this.cardFromPlayerBoard
      const boardCardLocation = boardCard.getItem()!.location
      if (this.material(MaterialType.KingdomCard).location(LocationType.EventArea).length < 1)
        return [ this.rules().startRule(RuleId.Error) ]
      if (boardCardLocation === undefined)
        return [ this.rules().startRule(RuleId.Error) ]
//      eventCard.moveItems(boardCardLocation)
      boardCardLocation.z=1
      const res = [
//        boardCard.rotateItem(true),
        boardCard.moveItem({ type: LocationType.KingdomDiscard, rotation:true}),
        eventCard.moveItem(boardCardLocation),
        this.rules().startRule(RuleId.Ok)
      ]

      return res
    }
    return [ this.rules().startRule(RuleId.Ok) ]
  }
}
