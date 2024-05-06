import { Location, Material, PlayerTurnRule } from '@gamepark/rules-api'
import { KingdomCard } from '../material/KingdomCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { score } from '../logic/Score'

export abstract class PlayerTurnRuleWithLegendMoves extends PlayerTurnRule {
  getPlayerLegendMoves() {
    let kingdomCards=this.material(MaterialType.KingdomCard)
      .player(this.getActivePlayer())
      .rotation(true)
    let grid=score.toGrid(this.getActivePlayer(), kingdomCards)
    return this.getPlayerLegendMoves_inner(grid)
  }

  getPlayerLegendMoves_inner(kingdomCardsAsGrid:KingdomCard[][]) {
    // Available legend cards
    // Only 1 legend card per turn
    let moves=[]
    if (!this.remind(Memory.PickedLegend)){
      let legendCharac=score.legendAnalysisFromGrid(kingdomCardsAsGrid)

      let availableLegendCards=
        this.material(MaterialType.LegendCard)
        .location(LocationType.LegendLine)
        .filter(item => {
          return legendCharac.match(item.id)
        })
      let availableLegendCardsActions = availableLegendCards.selectItems()

      moves.push(...availableLegendCardsActions)
    }
    return moves
  }

  // To get the possible legend moves after a card is added to the board
  getPlayerLegendMovesAfterMove(card:Material, location:Location){
    let kingdomCardId:KingdomCard=card.getItem()!.id
    let kingdomCards=this.material(MaterialType.KingdomCard)
      .player(this.getActivePlayer())
      .rotation(true)

    let grid=score.toGrid(this.getActivePlayer(), kingdomCards)
    score.setGrid(grid, location.x!, location.y!, kingdomCardId)
    let res=this.getPlayerLegendMoves_inner(grid)

    return res
  }
}
