import { PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'

export class ChooseBoardLocationRule extends PlayerTurnRule {
  getPlayerMoves() {
    const moves = []
    for (let i=1; i<=4; i++){
      for (let j=1; j<=4; j++){
        // TODO - Check move validity
        moves.push(
          ...this.material(MaterialType.KingdomCard)
          .location(LocationType.EventArea)
          .moveItems({
            type: LocationType.PlayerBoard,
            player: this.player,
            x: i,
            y: j
          }))
      }
    }
    return moves
  }
}
