import { isSelectItem, /* isMoveItemType, */ ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class ChooseLegendaryCardRule extends PlayerTurnRule {
  onRuleStart() {
    // If the deck is empty, all cards from the discard are shuffled
    // If the discard is empty, a card is drawn from the deck
    if (this.kingdomDeckCards().length==0 || this.discardDeckCards().length==0)
      return [ this.rules().startPlayerTurn(RuleId.ShuffleKingdomDeck, this.getActivePlayer()) ]
//      return [ this.rules().startRule(RuleId.ShuffleKingdomDeck) ]

    return []
  }

  getPlayerMoves() {
    const deckCards = this.kingdomDeckCards()
//    const deckCardActions = deckCards.length==0 ? [] : deckCards.index(deckCards.getIndexes()[deckCards.length-1]).selectItems()
    const deckCardActions = deckCards.length==0 ? [] : deckCards.maxBy(item => item.location.x!).selectItems()
    const discardCards = this.discardDeckCards()
//    const discardCardActions = discardCards.length==0 ? [] : discardCards.index(discardCards.getIndexes()[discardCards.length-1]).selectItems()
    const discardCardActions = discardCards.length==0 ? [] : discardCards.maxBy(item => item.location.x!).selectItems()
//    const discardCardActions = discardCards.length==0 ? [] : discardCards.selectItems()

    console.log("deck")
    console.log(deckCards)
    console.log("discard")
    console.log(discardCards)
    console.log("deck indexes")
    console.log(deckCards.getIndexes())
    console.log("discard indexes")
    console.log(discardCards.getIndexes())
    console.log("deckCardActions")
    console.log(deckCardActions)
    console.log("discardCardActions")
    console.log(discardCardActions)

    console.log("res")
    console.log([ ...deckCardActions, ...discardCardActions])

    console.log(this)

    return [
      ...deckCardActions,
      ...discardCardActions
    ]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    console.log('foo 1')
    if (isSelectItem(move)) {
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
        const discardCards = this.discardDeckCards()
        moves=discardCards.index(discardCards.getIndexes()[discardCards.length-1]).moveItems({ type: LocationType.EventArea })
      }
      moves.push(this.rules().startPlayerTurn(RuleId.ChooseBoardLocation, this.getActivePlayer()))

      return moves
    }
    return []
  }

  drawLegendaryCard(){
    const moves: MaterialMove[] = []
    const deck = this.kingdomDeck()

    if (deck.length <= 0){
      const deck2 = this.discardDeck()
      moves.push(...deck2.deal({ type: LocationType.EventArea }, 1))
    } else {
      moves.push(...deck.deal({ type: LocationType.EventArea }, 1))
    }
    return moves
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
