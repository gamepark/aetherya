import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { KingdomCard } from '../material/KingdomCard'
import { Memory } from './Memory'
import { PlayerTurnRuleWithLegendMoves } from './PlayerTurnRuleWithLegendMoves'
import { RuleId } from './RuleId'

export class ChooseBoardLocationRule extends PlayerTurnRuleWithLegendMoves {
  getPlayerMoves() {
    let cardEvents=this.cardsFromEventArea.getItems()
    if (cardEvents.length==0) return []

    let cardEvent=cardEvents[0]
    let eventCardId=cardEvent.id

    let moves:MaterialMove[]=[]

    this.material(MaterialType.KingdomCard)
      .location(LocationType.PlayerBoard)
      .player(this.player)
      .filter(item =>
        item.id===undefined || !item.location.rotation ||
        (item.id != KingdomCard.Portal && item.id != KingdomCard.Dragon && item.id != eventCardId )
      )
      .getItems()
      .forEach(item => {
        moves.push(...this.cardsFromEventArea.moveItems(
        {
          type:LocationType.PlayerBoard,
          player:this.player, x:item.location.x, y:item.location.y, rotation:true
        }))
      })
    return moves
  }

  get cardsFromEventArea() {
    return this.material(MaterialType.KingdomCard).location(LocationType.EventArea)
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.KingdomCard)(move)){
      // Move the card at the target location into the discard
      let boardCard=this
        .material(MaterialType.KingdomCard)
        .location(LocationType.PlayerBoard)
        .filter(item => {
          return item.location.player==this.player && item.location.x==move.location.x && item.location.y==move.location.y
        })
      return boardCard.moveItems({ type: LocationType.KingdomDiscard, rotation:true })
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.KingdomCard)(move)){
      // Moves to discard are ignored here
      if (move.location.type!=LocationType.PlayerBoard)
        return []

      let movedCard=this
        .material(MaterialType.KingdomCard)
        .index(move.itemIndex)

      // If the player already picked a legend card, it's the end of the turn
      // otherwise the player may pick a legend card
      let nextTurn=undefined

      // Note from François - It's forbidden to pick a legend card after revealing his 16th card
      if (this.remind(Memory.PickedLegend)
        || this.getPlayerLegendMovesAfterMove(movedCard, move.location.x!, move.location.y!).length==0
        || this.allKingdomCardsVisibleAfterMove(move.location.x!, move.location.y!)
      ){
        // Reset turn state for next player
        this.forget(Memory.PickedLegend)
        nextTurn=this.rules().startPlayerTurn(RuleId.ChooseCard, this.nextPlayer)
      } else {
        nextTurn=this.rules().startPlayerTurn(RuleId.ChooseLegend, this.getActivePlayer())
      }

      return [
        nextTurn
      ]
    }
    return []
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
