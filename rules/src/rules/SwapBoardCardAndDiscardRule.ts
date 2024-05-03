import { PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class SwapBoardCardAndDiscardRule extends PlayerTurnRule {
  onRuleStart() {
    const eventCard = this.cardFromEventArea

    // Unselect all cards
    this.material(MaterialType.KingdomCard).selected(true).getItems().forEach((item) => delete item.selected)

    // Move cards
    return [
      eventCard.moveItem({ type: LocationType.KingdomDiscard, rotation:true }),
      this.rules().startPlayerTurn(RuleId.ChooseLegendaryCard, this.nextPlayer)
    ]
  }

  get cardFromEventArea() {
    return this.material(MaterialType.KingdomCard).location(LocationType.EventArea).selected()
  }

  get cardFromPlayerBoard() {
    return this.material(MaterialType.KingdomCard).location(LocationType.PlayerBoard).player(this.player).selected()
  }
}
