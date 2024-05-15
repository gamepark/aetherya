import { MaterialGameSetup } from '@gamepark/rules-api'
import { AetheryaOptions } from './AetheryaOptions'
import { AetheryaRules } from './AetheryaRules'
import { kingdomCards } from './material/KingdomCard'
import { legendCards } from './material/LegendCard'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class AetheryaSetup extends MaterialGameSetup<number, MaterialType, LocationType, AetheryaOptions> {
  Rules = AetheryaRules

  setupMaterial() {
    this.setupKingdomCards()
    this.setupLegendCards()
    this.setupLegendLine()
    this.setupPlayers()
  }

  setupKingdomCards() {
    const cards = []
    for (let i=0; i<2*this.game.players.length; i++){
      cards.push(...kingdomCards.map((kingdomCard) => ({
        id: kingdomCard,
        location: {
          type: LocationType.KingdomDeck
        }
      })))
    }

    this.material(MaterialType.KingdomCard).createItems(cards)
    this.material(MaterialType.KingdomCard).shuffle()
  }

  setupLegendCards() {
    const cards=legendCards.map((legendCard) => ({
      id: legendCard,
      location: {
        type: LocationType.LegendDeck
      }
    }))

    this.material(MaterialType.LegendCard).createItems(cards)
    this.material(MaterialType.LegendCard).shuffle()
  }

  setupLegendLine() {
    this.material(MaterialType.LegendCard).deck().deal({ type: LocationType.LegendLine }, 8)
  }

  setupPlayers() {
    for (const player of this.game.players) {
      this.draw4UniqueCards(player)
    }
    this.material(MaterialType.KingdomCard).location(LocationType.KingdomDiscard).moveItems({type: LocationType.KingdomDeck})
    this.material(MaterialType.KingdomCard).location(LocationType.KingdomDeck).shuffle()
    for (const player of this.game.players) {
      this.dealKingdomBorders(player)
    }
  }

  draw4UniqueCards(player: number) {
    const deck = this.material(MaterialType.KingdomCard).location(LocationType.KingdomDeck).deck()
    let cardsToDeal = 4
    do {
      deck.deal({ type: LocationType.PlayerHand, player, rotation: true }, cardsToDeal)
    } while (cardsToDeal = this.discardDuplicates(player))
  }

  discardDuplicates(player: number) {
    const hand = this.material(MaterialType.KingdomCard).location(LocationType.PlayerHand).player(player)
    const duplicates = hand.filter((item, index) => hand.getIndexes().some(i => i < index && hand.getItem(i)?.id === item.id))
    if (duplicates.length > 0) {
      duplicates.moveItems({type: LocationType.KingdomDiscard})
    }
    return duplicates.length
  }

  dealKingdomBorders(player: number) {
    const deck = this.material(MaterialType.KingdomCard).deck()
    for (let x = 1 ; x <= 4 ; x++ ) {
      for (let y = 1 ; y <= 4 ; y++ ) {
        if ((x !== 2 && x !== 3) || (y !== 2 && y !== 3)) {
          deck.dealOne({type: LocationType.PlayerBoard, player, x, y, rotation: false})
        }
      }
    }
  }

  start() {
    this.startSimultaneousRule(RuleId.PrepareGame)
  }
}
