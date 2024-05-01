import { PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'

export class ChooseBoardLocationRule extends PlayerTurnRule {
  getPlayerMoves() {
    return this.material(MaterialType.LegendaryCard)
      .location(LocationType.EventArea)
      .moveItems({
        type: LocationType.PlayerBoard,
        player: this.player
      })
  }
}
