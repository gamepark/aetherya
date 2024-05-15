import { isMoveItemType, isStartRule, ItemMove, MaterialMove, PlayerTurnRule, RuleMove } from '@gamepark/rules-api'
import { score } from '../logic/Score'
import { KingdomCard } from '../material/KingdomCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class AcquireLegendRule extends PlayerTurnRule {
  onRuleStart(move: RuleMove): MaterialMove[] {
    if (isStartRule(move) && move.id === RuleId.AcquireLegend) {
      if (this.isKingdomComplete) {
        return [ this.rules().startRule(RuleId.RevealAllBoardCards) ]
      } else if (!this.getPlayerLegendMoves().length) {
        this.forget(Memory.PickedLegend)
        return [this.rules().startPlayerTurn(RuleId.DrawOrPlaceDiscardCard, this.nextPlayer)]
      }
    }
    return []
  }

  get isKingdomComplete() {
    return this.material(MaterialType.KingdomCard).player(this.player).location(l => l.type === LocationType.PlayerBoard && !l.rotation).length === 0
  }

  getPlayerMoves(): MaterialMove[] {
    if (!this.remind(Memory.PickedLegend)){
      // TODO: do we allow the player to pass when he could take a legend card?
      return this.getPlayerLegendMoves()
    }
    return []
  }

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

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.LegendCard)(move) && move.location.type === LocationType.PlayerLegendLine) {
      const consequences: MaterialMove[] = this.refillLegendLineActions()
      if (this.game.rule!.id === RuleId.AcquireLegend) {
        consequences.push(this.rules().startPlayerTurn(RuleId.DrawOrPlaceDiscardCard, this.nextPlayer))
      } else {
        this.memorize(Memory.PickedLegend, true)
      }
      return consequences
    }
    return []
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
}
