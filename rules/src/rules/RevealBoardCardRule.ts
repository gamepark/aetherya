import { isSelectItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
//import { KingdomCard } from '../material/KingdomCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class RevealBoardCardRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    // The player must select an hidden card and reveal it
    return this.material(MaterialType.KingdomCard)
      .location(LocationType.PlayerBoard)
      .player(this.player)
      .filter(item => item.id === undefined || !item.location.rotation)
      .selectItems()
  }

  afterItemMove(move: ItemMove) {
    if (isSelectItemType(MaterialType.KingdomCard)(move)) {
      console.log(move)

      const cards = this.material(MaterialType.KingdomCard).selected()
      cards.getItems().forEach(card => { delete card.selected })

      // Use the acquire legend rule to check game over conditions
      // and move to next player's turn if needed
      return [
        ...cards.moveItems({ rotation:true }),
        this.rules().startRule(RuleId.AcquireLegend)
      ]
    }
    return []
  }
}
