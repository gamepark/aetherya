import { CustomMove, isSelectItem,/* isMoveItemType, */ ItemMove, MaterialMove /* , PlayerTurnRule */ } from '@gamepark/rules-api'
import { CustomMoveType } from './CustomMoveType'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { PlayerTurnRuleWithLegendaryMoves } from './PlayerTurnRuleWithLegendaryMoves'
import { RuleId } from './RuleId'
//import { Score } from '../logic/Score'

export class ChooseLegendaryRule extends PlayerTurnRuleWithLegendaryMoves {
  onRuleStart() {
    console.log("Choose legendary rule - onRuleStart")
    if (this.getPlayerMoves().length==0){
      this.forget(Memory.PickedLegendary)
      return [ this.rules().startPlayerTurn(RuleId.ChooseCard, this.nextPlayer) ]
    }
    return []
  }

  getPlayerMoves() {
    return [
      ...this.getPlayerLegendaryMoves(),
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
      if (move.itemType==MaterialType.LegendaryCard){
        // Legendary card from legendary card line
        const card = this.material(MaterialType.LegendaryCard).index(move.itemIndex)
        const itemLocation = card.getItem()!.location
        const nbLegendaryCards = this.material(MaterialType.LegendaryCard).player(this.getActivePlayer()).getItems().length

        // this.memorize(Memory.PickedLegendary, true)

        return [
          card.moveItem({ type: LocationType.PlayerLegendaryLine, player:this.getActivePlayer(), x:nbLegendaryCards+1 }),
          ...this.legendaryDeck().deal(itemLocation, 1),
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

  legendaryDeck() {
    return this.material(MaterialType.LegendaryCard)
      .location(LocationType.LegendaryDeck)
      .deck()
  }
}
