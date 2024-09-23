import { isMoveItemType, ItemMove, MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class PrepareGameRule extends SimultaneousRule {
  getActivePlayerLegalMoves(player: number) {
    // Place hand cards into any empty central square
    const handCards =
      this.material(MaterialType.KingdomCard)
      .location(LocationType.PlayerHand)
      .player(player)

    const boardCards =
      this.material(MaterialType.KingdomCard)
      .location(LocationType.PlayerBoard)
      .player(player)

    let moves:MaterialMove[]=[]
    for (let x=2; x<=3; x++){
      for (let y=2; y<=3; y++){
        let item=boardCards.filter(item => item.location.x==x && item.location.y==y)
        if (item.length === 0){
          // (x,y) is an empty square
          moves.push(...handCards.moveItems({type:LocationType.PlayerBoard, player, x, y, rotation:true}))
        }
      }
    }
    return moves
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.KingdomCard)(move) || move.location.type !== LocationType.PlayerBoard) return []

    const item = this.material(MaterialType.KingdomCard).getItem(move.itemIndex)
    const playerId = item.location.player!

    const handCards =
      this.material(MaterialType.KingdomCard)
      .location(LocationType.PlayerHand)
      .player(playerId)

    if (handCards.length==0)
      return [this.endPlayerTurn(playerId)]

    return []
  }

  getMovesAfterPlayersDone() {
    return [
      this.material(MaterialType.KingdomCard).location(LocationType.KingdomDeck).deck().dealOne({ type: LocationType.KingdomDiscard, rotation:true }),
      this.startPlayerTurn(RuleId.DrawOrPlaceDiscardCard, this.game.players[0])
    ]
  }
}
