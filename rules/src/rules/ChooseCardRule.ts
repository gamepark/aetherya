import { /*isSelectItem, */ isMoveItem, ItemMove, MaterialMove } from '@gamepark/rules-api'
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

    return []
  }

  getPlayerMoves() {
    // Card from the deck
    const deckCardActions = this.kingdomDeckCards()
      .maxBy(item => item.location.x!)
      .moveItems({ type:LocationType.EventArea, rotation:true })

    // Card from the discard
    const discardCardActions = this.discardDeckCards()
      .maxBy(item => item.location.x!)
      .moveItems({ type:LocationType.EventArea, rotation:true })

    // Legend card moves
    const availableLegendCardsActions=this.getPlayerLegendMoves()

    return [
      ...deckCardActions,
      ...discardCardActions,
      ...availableLegendCardsActions
    ]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItem(move)){
      if (move.itemType==MaterialType.KingdomCard){
        // Kingdom card from deck or from discard
        return [ this.rules().startPlayerTurn(RuleId.ChooseBoardLocation, this.getActivePlayer()) ]
      } else if (move.itemType==MaterialType.LegendCard){
        // Legend card from legend card line
        this.memorize(Memory.PickedLegend, true)
        return this.refillLegendLineActions()
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
}
