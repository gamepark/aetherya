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
/*
      const boardCard = this.cardFromPlayerBoard
      return [
        boardCard.moveItem({ type: LocationType.KingdomDiscard, z:1 }),
        this.rules().startPlayerTurn(RuleId.SwapBoardCardAndDiscard, this.player)
      ]
*/
      const eventCard = this.cardFromEventArea
      const boardCard = this.cardFromPlayerBoard
      const boardCardLocation = boardCard.getItem()!.location
      if (this.material(MaterialType.KingdomCard).location(LocationType.EventArea).length < 1)
        return [ this.rules().startRule(RuleId.Error) ]
      if (boardCardLocation === undefined)
        return [ this.rules().startRule(RuleId.Error) ]
      boardCardLocation.z=1
      return [
        boardCard.moveItem({ type: LocationType.EventArea }),
        eventCard.moveItem(boardCardLocation),
        this.rules().startPlayerTurn(RuleId.SwapBoardCardAndDiscard, this.player)
      ]
    }
    return []
  }
}
