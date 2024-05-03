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
    const deckCardActions = deckCards.length==0 ? [] : deckCards.maxBy(item => item.location.x!).selectItems()
    const discardCards = this.discardDeckCards()
    const discardCardActions = discardCards.length==0 ? [] : discardCards.maxBy(item => item.location.x!).selectItems()

    console.log("deck cards")
    console.log(deckCards)
    console.log("discard cards")
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
    if (isSelectItem(move)) {
      console.log('Choose lengardy card - Select move')
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
/*
        const discardCards = this.discardDeckCards()
        moves=discardCards.maxBy(item => item.location.x!).moveItems({ type: LocationType.EventArea, rotation:true })
*/
      }
      moves.push(this.rules().startPlayerTurn(RuleId.ChooseBoardLocation, this.getActivePlayer()))

      return moves
    }
    console.log('Choose lengardy card - Not a select move')
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
