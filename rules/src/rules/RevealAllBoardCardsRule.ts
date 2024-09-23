import { MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class RevealAllBoardCardsRule extends MaterialRulesPart {
  onRuleStart() {
    // Show all board cards
    return [
      this.material(MaterialType.KingdomCard)
        .location(LocationType.PlayerBoard)
        .filter(item => !item.location.rotation)
        .moveItemsAtOnce({rotation:true}),
      this.startRule(RuleId.Score)
    ]
  }
}
