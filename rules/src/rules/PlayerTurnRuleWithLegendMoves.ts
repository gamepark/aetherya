import { /*Location,*/ Material, PlayerTurnRule } from '@gamepark/rules-api'
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

      const nbLegendCards = this.material(MaterialType.LegendCard).player(this.getActivePlayer()).getItems().length
      let availableLegendCardsActions =
        availableLegendCards.moveItems(
          {
            type: LocationType.PlayerLegendLine,
            player:this.getActivePlayer(),
            x:nbLegendCards+1
          })

      moves.push(...availableLegendCardsActions)
    }
    return moves
  }

  // To get the possible legend moves after a card is added to the board
  getPlayerLegendMovesAfterMove(card:Material, locationX:number, locationY:number){
    let kingdomCardId:KingdomCard=card.getItem()!.id
    let kingdomCards=this.material(MaterialType.KingdomCard)
      .player(this.getActivePlayer())
      .rotation(true)

    let grid=score.toGrid(this.getActivePlayer(), kingdomCards)
    score.setGrid(grid, locationX, locationY, kingdomCardId)
    let res=this.getPlayerLegendMoves_inner(grid)

    return res
  }

  legendLineCards(){
    return this.material(MaterialType.LegendCard)
      .location(LocationType.LegendLine)
  }

  legendDeck() {
    return this.material(MaterialType.LegendCard)
      .location(LocationType.LegendDeck)
      .deck()
  }

  refillLegendLineActions(){
    let moves=[]
    const legDeck=this.legendDeck()
    const nbLegendCardsInDeck=legDeck.getItems().length
    if (nbLegendCardsInDeck > 0){
      const allLegendLineCards=this.legendLineCards()
      for (let i=1; i<=8; i++){
        if (allLegendLineCards.filter(item => item.location.x==i).getItems().length==0){
          moves.push(...legDeck.deal({ type:LocationType.LegendLine, x:i }, 1))
        }
      }
    }
    return moves
  }

  allKingdomCardsVisibleAfterMove(moveLocationX:number, moveLocationY:number){
    // Returns true if 15th card were revealed, and the move is about the missing location
    let nbVisibleCards = this.material(MaterialType.KingdomCard)
      .location(LocationType.PlayerBoard)
      .player(this.getActivePlayer())
      .filter(item => !!item.location.rotation)
      .length

    let moveRevealsACard = this.material(MaterialType.KingdomCard)
      .location(LocationType.PlayerBoard)
      .player(this.getActivePlayer())
      .filter(item => (item.location.x==moveLocationX && item.location.y==moveLocationY && !item.location.rotation))
      .length > 0

    return (moveRevealsACard && nbVisibleCards >= 15)
  }
}
