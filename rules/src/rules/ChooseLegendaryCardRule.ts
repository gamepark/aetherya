import { isSelectItem, /* isMoveItemType, */ ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class ChooseLegendaryCardRule extends PlayerTurnRule {
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

    return []
  }

  getPlayerMoves() {
    const deckCards = this.kingdomDeckCards()
    const deckCardActions = deckCards.length==0 ? [] : deckCards.maxBy(item => item.location.x!).selectItems()
    const discardCards = this.discardDeckCards()
    const discardCardActions = discardCards.length==0 ? [] : discardCards.maxBy(item => item.location.x!).selectItems()

    return [
      ...deckCardActions,
      ...discardCardActions
    ]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isSelectItem(move)) {
      console.log("move")
      console.log(move)
      const itemLocation = this.material(MaterialType.KingdomCard)
        .index(move.itemIndex)
        .getItem()!
        .location.type

      let moves: MaterialMove[] = []

      if (itemLocation == LocationType.KingdomDeck){
        // Get card from deck
        moves=this.drawLegendaryCard()
      } else {
        // Get card from discard
        moves=this.discardDeck().deal({ type: LocationType.EventArea }, 1)
      }
      moves.push(this.rules().startPlayerTurn(RuleId.ChooseBoardLocation, this.getActivePlayer()))

      return moves
    }
    return []
  }

  drawLegendaryCard(){
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
}
