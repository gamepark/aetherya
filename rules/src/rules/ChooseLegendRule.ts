import { CustomMove, isSelectItem,/* isMoveItemType, */ ItemMove, MaterialMove /* , PlayerTurnRule */ } from '@gamepark/rules-api'
import { CustomMoveType } from './CustomMoveType'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { PlayerTurnRuleWithLegendMoves } from './PlayerTurnRuleWithLegendMoves'
import { RuleId } from './RuleId'

export class ChooseLegendRule extends PlayerTurnRuleWithLegendMoves {
  onRuleStart() {
    if (this.getPlayerMoves().length==0){
      this.forget(Memory.PickedLegend)
      return [ this.rules().startPlayerTurn(RuleId.ChooseCard, this.nextPlayer) ]
    }
    return []
  }

  getPlayerMoves() {
    return [
      ...this.getPlayerLegendMoves(),
      this.rules().customMove(CustomMoveType.Pass)
    ]
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.Pass) {
      return [ this.rules().startPlayerTurn(RuleId.ChooseCard, this.nextPlayer) ]
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isSelectItem(move)) {
      if (move.itemType==MaterialType.LegendCard){
        // Legend card from legend card line
        const card = this.material(MaterialType.LegendCard).index(move.itemIndex)
        const itemLocation = card.getItem()!.location
        const nbLegendCards = this.material(MaterialType.LegendCard).player(this.getActivePlayer()).getItems().length

        // this.memorize(Memory.PickedLegend, true)

        return [
          card.moveItem({ type: LocationType.PlayerLegendLine, player:this.getActivePlayer(), x:nbLegendCards+1 }),
          ...this.legendDeck().deal(itemLocation, 1),
          this.rules().startPlayerTurn(RuleId.ChooseCard, this.nextPlayer)
        ]
      }
    }
    return []
  }

  drawKingdomCard(){
    return this.kingdomDeck().deal({ type: LocationType.EventArea }, 1)
  }

  kingdomDeckCards() {
    return this.material(MaterialType.KingdomCard)
      .location(LocationType.KingdomDeck)
  }

  kingdomDeck() {
    return this.kingdomDeckCards().deck()
  }

  discardDeckCards() {
    return this.material(MaterialType.KingdomCard)
      .location(LocationType.KingdomDiscard)
  }

  discardDeck() {
    return this.discardDeckCards().deck()
  }

  legendDeck() {
    return this.material(MaterialType.LegendCard)
      .location(LocationType.LegendDeck)
      .deck()
  }
}
