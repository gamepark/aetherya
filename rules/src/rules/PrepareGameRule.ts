import { CustomMove, isMoveItemType, ItemMove, MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { CustomMoveType } from './CustomMoveType'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class PrepareGameRule extends SimultaneousRule {
  getActivePlayerLegalMoves(playerId: number) {
    const boardCards =
      this.material(MaterialType.KingdomCard)
      .location(LocationType.PlayerBoard)
      .player(playerId)

    let moves:MaterialMove[]=[]
    for (let i=2; i<=3; i++){
      for (let j=2; j<=3; j++){
        let item=boardCards.filter(item => item.location.x==i && item.location.y==j)
        for (let a=2; a<=3; a++){
          for (let b=2; b<=3; b++){
            if (i!=a || j!=b){
              moves.push(
                ...item.moveItems({ type:LocationType.PlayerBoard, player:playerId, x:a, y:b, z:1, rotation:true })
              )
            }
          }
        }
      }
    }
    moves.push( this.rules().customMove(CustomMoveType.Pass, playerId) )
    return moves
  }

  beforeItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.KingdomCard)(move)) return []

    const item = this.material(MaterialType.KingdomCard).getItem(move.itemIndex)!
    const player = item.location.player!
    return [
      ...this.material(MaterialType.KingdomCard)
        .location(LocationType.PlayerBoard)
        .player(player)
        .filter(card => card.location.x==move.location.x && card.location.y==move.location.y)
        .moveItems({ type:LocationType.PlayerBoard, player:player, x:item.location.x, y:item.location.y, z:1, rotation:true }),
      this.rules().endPlayerTurn(player)
    ]
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.Pass) {
      console.log('foo')
      console.log(move)
      const player = move.data
      return [ this.rules().endPlayerTurn(player) ]
    }
    return []
  }

  getMovesAfterPlayersDone(): MaterialMove<number, number, number>[] {
    return [ this.rules().startPlayerTurn(RuleId.ChooseLegendaryCard, this.game.players[0]) ]
  }
}
