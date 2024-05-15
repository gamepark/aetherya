import { /*isSelectItem, */ isMoveItem, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { KingdomCard } from '../material/KingdomCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { PlayerTurnRuleWithLegendMoves } from './PlayerTurnRuleWithLegendMoves'
import { RuleId } from './RuleId'

export class ChooseCardRule extends PlayerTurnRuleWithLegendMoves {
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

    // If the deck or the discard is empty, then shuffle and refill
    if (this.kingdomDeckCards().length==0 || this.discardDeckCards().length==0)
      return [ this.rules().startPlayerTurn(RuleId.ShuffleKingdomDeck, this.getActivePlayer()) ]

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

    let deckCardActions:MaterialMove[]=[]
    if (!this.remind(Memory.PickedCardFromDeck)
      && !this.remind(Memory.PlacedBoardCard)){
      // Card from the deck
      deckCardActions = this.kingdomDeckCards()
        .maxBy(item => item.location.x!)
        .moveItems({ type:LocationType.KingdomDiscard, rotation:true })
    }

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

    // Legend card moves
    let availableLegendCardsActions:MaterialMove[]=[]
    if (!this.remind(Memory.PickedLegend)){
      availableLegendCardsActions=this.getPlayerLegendMoves()
    }

    // Only legend => legend or pass
    // TODO

    return [
      ...deckCardActions,
      ...discardCardActions,
      ...availableLegendCardsActions
    ]
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.KingdomCard)(move)){
      if (move.location.type==LocationType.PlayerBoard){
        // Discard -> Board
        this.memorize(Memory.PlacedBoardCard, true)

        // Move the card at the target location into the discard
        let boardCard=this
          .material(MaterialType.KingdomCard)
          .location(LocationType.PlayerBoard)
          .filter(item => {
            return item.location.player==this.player && item.location.x==move.location.x && item.location.y==move.location.y
          })
        return boardCard.moveItems({ type: LocationType.KingdomDiscard, rotation:true })
      } else if (move.location.type==LocationType.KingdomDiscard){
        let movedCardLocationType=this
          .material(MaterialType.KingdomCard)
          .index(move.itemIndex)
          .getItem()!.location.type
        if (movedCardLocationType==LocationType.PlayerBoard){
          // Do nothing
        } else if (movedCardLocationType==LocationType.KingdomDeck){
          // Deck -> Discard
          this.memorize(Memory.PickedCardFromDeck, true)
        }
        return []
      }
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItem(move)){
      if (move.itemType==MaterialType.KingdomCard){

        if (move.location.type==LocationType.KingdomDiscard){
          // Deck -> Discard
          // Case 1 - Card from board
          // Case 2 - Card from deck
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
          // Legend card from legend card line
          this.memorize(Memory.PickedLegend, true)

          let moves:MaterialMove[]=this.refillLegendLineActions()
          if (this.getPlayerMoves().length==0){
            moves.push(...this.cleanMemoryAndStartNewPlayerTurn())
          }
          return moves
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
    this.forget(Memory.PickedCardFromDeck)
    this.forget(Memory.PlacedBoardCard)
    return [this.rules().startPlayerTurn(RuleId.ChooseCard, this.nextPlayer)]
  }
}
