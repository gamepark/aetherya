import { isSelectItem, /* isMoveItemType, */ ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'
import { Score } from '../logic/Score'

export class ChooseCardRule extends PlayerTurnRule {
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
    // Available legendary cards
    let score=new Score()
    let legendaryCharac=score.legendaryAnalysis(this.getActivePlayer(), this.material(MaterialType.KingdomCard))

    let availableLegendaryCards=
      this.material(MaterialType.LegendaryCard)
      .location(LocationType.LegendaryLine)
      .filter(item => {
        console.log("item")
        console.log(item)
        return legendaryCharac.match(item.id)
      })
    let availableLegendaryCardsActions = availableLegendaryCards.selectItems()

    console.log("Available legendary cards")
    console.log(availableLegendaryCards)

    // Card from the deck
    const deckCards = this.kingdomDeckCards()
    const deckCardActions = deckCards.maxBy(item => item.location.x!).selectItems()

    // Card from the discard
    const discardCards = this.discardDeckCards()
    const discardCardActions = discardCards.maxBy(item => item.location.x!).selectItems()

    return [
      ...deckCardActions,
      ...discardCardActions,
      ...availableLegendaryCardsActions
    ]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isSelectItem(move)) {
      if (move.itemType==MaterialType.KingdomCard){
        // Kingdom card from deck or from discard
        const itemLocation = this.material(MaterialType.KingdomCard)
          .index(move.itemIndex)
          .getItem()!
          .location.type

        let moves: MaterialMove[] = []

        if (itemLocation == LocationType.KingdomDeck){
          // Get card from deck
          moves=this.drawKingdomCard()
        } else if (itemLocation == LocationType.KingdomDiscard) {
          // Get card from discard
          moves=this.discardDeck().deal({ type: LocationType.EventArea }, 1)
        }
        moves.push(this.rules().startPlayerTurn(RuleId.ChooseBoardLocation, this.getActivePlayer()))
        return moves
      } else if (move.itemType==MaterialType.LegendaryCard){
        // Legendary card from legendary card line
        const card = this.material(MaterialType.LegendaryCard).index(move.itemIndex)
        const itemLocation = card.getItem()!.location

        return [
          card.moveItem({ type: LocationType.PlayerLegendaryLine, player:this.getActivePlayer() }),
          ...this.legendaryDeck().deal(itemLocation, 1)
        ]
      }
    }
    return []
  }

  drawKingdomCard(){
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

  legendaryDeck() {
    return this.material(MaterialType.LegendaryCard)
      .location(LocationType.LegendaryDeck)
      .deck()
  }
}
