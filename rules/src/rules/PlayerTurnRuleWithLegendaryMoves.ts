import { /*isSelectItem, isMoveItemType, ItemMove, MaterialMove, */ Location, Material, PlayerTurnRule } from '@gamepark/rules-api'
import { KingdomCard } from '../material/KingdomCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
// import { RuleId } from './RuleId'
import { score } from '../logic/Score'

export abstract class PlayerTurnRuleWithLegendaryMoves extends PlayerTurnRule {
  getPlayerLegendaryMoves() {
    return this.getPlayerLegendaryMoves_inner(
      this.material(MaterialType.KingdomCard)
        .player(this.getActivePlayer())
        .rotation(true))
  }

  getPlayerLegendaryMoves_inner(kingdomCards:Material) {
    // Available legendary cards
    // Only 1 legendary card per turn
    let moves=[]
    if (!this.remind(Memory.PickedLegendary)){
      let legendaryCharac=score.legendaryAnalysis(this.getActivePlayer(), kingdomCards)

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

    // WARNING - The list of cards is tweaked here
    // As the internal structure is directly used, it's not safe
    // To be replaced by something better
    let foundCard=false
    let foundIndex=0
    let foundId=undefined
    for (let i=0; i<kingdomCards.entries.length; i++){
      if ((kingdomCards.entries[i][1].location.x == location.x)
        && (kingdomCards.entries[i][1].location.y == location.y)){
        foundCard=true
        foundIndex=i
        foundId=kingdomCards.entries[i][1].id
        kingdomCards.entries[i][1].id=kingdomCardId
        break
      }
    }
    if (!foundCard){
      kingdomCards.entries.push([-1, {id:kingdomCardId, location:location}])
    }

    let res=this.getPlayerLegendaryMoves_inner(kingdomCards)

    if (!foundCard){
      kingdomCards.entries.pop()
    } else {
      kingdomCards.entries[foundIndex][1].id=foundId
    }

    return res
  }
}
