import { isMoveItemType, ItemMove, MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'
import { unitTests } from '../logic/UnitTests'

export class PrepareGameRule extends SimultaneousRule {
  getActivePlayerLegalMoves(playerId: number) {
    // Unit tests - May be disabled in the file UnitTests.ts
    unitTests.run()

    // Place hand cards into any empty central square
    const handCards =
      this.material(MaterialType.KingdomCard)
      .location(LocationType.PlayerHand)
      .player(playerId)

    const boardCards =
      this.material(MaterialType.KingdomCard)
      .location(LocationType.PlayerBoard)
      .player(playerId)

    let moves:MaterialMove[]=[]
    for (let i=2; i<=3; i++){
      for (let j=2; j<=3; j++){
        let item=boardCards.filter(item => item.location.x==i && item.location.y==j)
        if (item.getItems().length === 0){
          // (i,j) is an empty square
          moves.push(...handCards.moveItems({type:LocationType.PlayerBoard, player:playerId, x:i, y:j, z:1, rotation:true}))
        }
      }
    }
    return moves
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.KingdomCard)(move)) return []

    const item = this.material(MaterialType.KingdomCard).getItem(move.itemIndex)!
    const playerId = item.location.player!

    const handCards =
      this.material(MaterialType.KingdomCard)
      .location(LocationType.PlayerHand)
      .player(playerId)

    if (handCards.getItems().length==0)
      return [this.rules().endPlayerTurn(playerId)]

    return []
  }

  getMovesAfterPlayersDone(): MaterialMove<number, number, number>[] {
    return [ this.rules().startPlayerTurn(RuleId.ChooseCard, this.game.players[0]) ]
  }
}
