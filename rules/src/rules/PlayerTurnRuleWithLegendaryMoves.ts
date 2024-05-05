import { /*isSelectItem, isMoveItemType, ItemMove, MaterialMove, */ Location, Material, PlayerTurnRule } from '@gamepark/rules-api'
import { KingdomCard } from '../material/KingdomCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
// import { RuleId } from './RuleId'
import { score } from '../logic/Score'

export abstract class PlayerTurnRuleWithLegendaryMoves extends PlayerTurnRule {
  getPlayerLegendaryMoves() {
    let kingdomCards=this.material(MaterialType.KingdomCard)
      .player(this.getActivePlayer())
      .rotation(true)
    let grid=score.toGrid(this.getActivePlayer(), kingdomCards)
    return this.getPlayerLegendaryMoves_inner(grid)
  }

  getPlayerLegendaryMoves_inner(kingdomCardsAsGrid:KingdomCard[][]) {
    // Available legendary cards
    // Only 1 legendary card per turn
    let moves=[]
    if (!this.remind(Memory.PickedLegendary)){
      let legendaryCharac=score.legendaryAnalysisFromGrid(kingdomCardsAsGrid)

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

  // To get the possible legendary moves after a card is added to the board
  getPlayerLegendaryMovesAfterMove(card:Material, location:Location){
    let kingdomCardId:KingdomCard=card.getItem()!.id
    let kingdomCards=this.material(MaterialType.KingdomCard)
      .player(this.getActivePlayer())
      .rotation(true)

    let grid=score.toGrid(this.getActivePlayer(), kingdomCards)
    score.setGrid(grid, location.x!, location.y!, kingdomCardId)
    let res=this.getPlayerLegendaryMoves_inner(grid)

    return res
  }
}
