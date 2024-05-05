import { /*isSelectItem, isMoveItemType, ItemMove, MaterialMove, */ PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
// import { RuleId } from './RuleId'
import { score } from '../logic/Score'

export abstract class PlayerTurnRuleWithLegendaryMoves extends PlayerTurnRule {
  getPlayerLegendaryMoves() {
    // Available legendary cards
    // Only 1 legendary card per turn
    let moves=[]
    if (!this.remind(Memory.PickedLegendary)){
      // Force a card at a given location - as not yet transmitted
      // TODO
      let legendaryCharac=score.legendaryAnalysis(this.getActivePlayer(), this.material(MaterialType.KingdomCard).rotation(true))
//      console.log(legendaryCharac)

      let availableLegendaryCards=
        this.material(MaterialType.LegendaryCard)
        .location(LocationType.LegendaryLine)
        .filter(item => {
          return legendaryCharac.match(item.id)
        })
      let availableLegendaryCardsActions = availableLegendaryCards.selectItems()

      moves.push(...availableLegendaryCardsActions)
    }
    return moves
  }
}
