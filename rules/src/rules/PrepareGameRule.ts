import { PlayerTurnRule } from '@gamepark/rules-api'
//import { LocationType } from '../material/LocationType'
//import { MaterialType } from '../material/MaterialType'

export class PrepareGameRule extends PlayerTurnRule {
  onRuleStart(){
/*
    const moves=[]
    moves.push(this.material(MaterialType.KingdomCard)
      .location(LocationType.KingdomDeck)
      .deck()
      .deal({ type: LocationType.KingdomDiscard }, 1))
    return moves
*/
    return []
  }
}
