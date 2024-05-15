import { isMoveItem, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { KingdomCard } from '../material/KingdomCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { AcquireLegendRule } from './AcquireLegendRule'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class PlaceDiscardCardRule extends AcquireLegendRule {
  onRuleStart() {
    // If a board is full of visible cards, then it's the end of the game
    let nbPlayers=this.game.players.length
    for (let i=0; i<nbPlayers; i++){
      let player=this.game.players[i]
      let nbVisibleCards = this.material(MaterialType.KingdomCard)
        .location(LocationType.PlayerBoard)
        .player(player)
        .filter(item => !!item.location.rotation)
        .length

      if (nbVisibleCards >= 16)
        return [ this.rules().startRule(RuleId.RevealAllBoardCards) ]
    }

    // No remaining action for the player => go to next player's turn
    let availableLegendCardsActions:MaterialMove[]=[]
    if (!this.remind(Memory.PickedLegend)){
      availableLegendCardsActions=this.getPlayerLegendMoves()
    }
    if (this.remind(Memory.PlacedBoardCard) && availableLegendCardsActions.length==0){
      return this.cleanMemoryAndStartNewPlayerTurn()
    }

    return []
  }

  getPlayerMoves(): MaterialMove[] {

    // Card from the discard
    let discardCardActions:MaterialMove[]=[]
    if (!this.remind(Memory.PlacedBoardCard)){
      const discardCards = this.discardDeckCards()
        .maxBy(item => item.location.x!)
      const discardCardItems=discardCards.getItems()
      if (discardCardItems.length==0) return []
      let discardCard=discardCardItems[0]
      let discardCardId=discardCard.id

      this.material(MaterialType.KingdomCard)
        .location(LocationType.PlayerBoard)
        .player(this.player)
        .filter(item =>
          item.id===undefined || !item.location.rotation ||
          (item.id != KingdomCard.Portal && item.id != KingdomCard.Dragon && item.id != discardCardId )
        )
        .getItems()
        .forEach(item => {
          discardCardActions.push(...discardCards.moveItems(
            {
              type:LocationType.PlayerBoard,
              player:this.player, x:item.location.x, y:item.location.y, rotation:true
            }))
          })
    }

    return [
      ...discardCardActions,
      ...super.getPlayerMoves()
    ]
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.KingdomCard)(move)){
      if (move.location.type==LocationType.PlayerBoard){
        // Discard -> Board
        this.memorize(Memory.PlacedBoardCard, true)

        // Move the card at the target location into the discard
        const boardCard = this.material(MaterialType.KingdomCard)
          .location(l => l.type === LocationType.PlayerBoard && l.player === this.player && l.x === move.location.x && l.y === move.location.y)
        return [boardCard.moveItem({ type: LocationType.KingdomDiscard, rotation:true })]
      }
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const consequences = super.afterItemMove(move)
    if (isMoveItem(move)){
      if (move.itemType==MaterialType.KingdomCard){

        if (move.location.type==LocationType.KingdomDiscard){
          if (this.kingdomDeckCards().length === 0) {
            const discardCardsBeforeMove = this.discardDeckCards().index(index => index !== move.itemIndex)
            return [
              discardCardsBeforeMove.moveItemsAtOnce({ type: LocationType.KingdomDeck }),
              discardCardsBeforeMove.shuffle()
            ]
          }
          return []
        } else if (move.location.type==LocationType.PlayerBoard){
          // Discard -> Board
          let movedCard=this
            .material(MaterialType.KingdomCard)
            .index(move.itemIndex)

          // If the player already picked a legend card, it's the end of the turn
          // otherwise the player may pick a legend card

          // Note from François - It's forbidden to pick a legend card after revealing his 16th card
          if (this.remind(Memory.PickedLegend)
            || this.getPlayerLegendMovesAfterMove(movedCard, move.location.x!, move.location.y!).length==0
            || this.allKingdomCardsVisibleAfterMove(move.location.x!, move.location.y!)
          ){
            // Reset turn state for next player
            return this.cleanMemoryAndStartNewPlayerTurn()
          } else {
            this.remind(Memory.PlacedBoardCard)
            return []
          }
        }
      } else if (move.itemType==MaterialType.LegendCard){
        if (move.location.type==LocationType.PlayerLegendLine){
          if (this.getPlayerMoves().length==0){
            consequences.push(...this.cleanMemoryAndStartNewPlayerTurn())
          }
          return consequences
        }
      }
    }
    return []
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

  cleanMemoryAndStartNewPlayerTurn(){
    this.forget(Memory.PickedLegend)
    this.forget(Memory.PlacedBoardCard)
    return [this.rules().startPlayerTurn(RuleId.DrawOrPlaceDiscardCard, this.nextPlayer)]
  }
}
