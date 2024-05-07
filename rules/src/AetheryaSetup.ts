import { MaterialGameSetup } from '@gamepark/rules-api'
import { AetheryaOptions } from './AetheryaOptions'
import { AetheryaRules } from './AetheryaRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { RuleId } from './rules/RuleId'
import { kingdomCards } from './material/KingdomCard'
import { legendCards } from './material/LegendCard'

/**
 * This class creates a new Game based on the game options
 */
export class AetheryaSetup extends MaterialGameSetup<number, MaterialType, LocationType, AetheryaOptions> {
  Rules = AetheryaRules

  setupMaterial(options: AetheryaOptions) {
    this.setupKingdomCards(options)
    this.setupLegendCards()
    this.setupLegendLine()
    this.setupPlayers(options)
  }

  setupKingdomCards(options: AetheryaOptions) {
    const cards = []
    for (let i=0; i<2*options.players; i++){
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
    const deck = this.material(MaterialType.LegendCard).deck()
    for (let i=1; i<=8; i++){
      deck.deal({ type: LocationType.LegendLine, x:i }, 1)
    }
  }

  setupPlayers(options: AetheryaOptions) {
    const deck = this.material(MaterialType.KingdomCard).deck()
    for (let index = 0; index < options.players; index++) {
      // Player's hand
      for (let i=1; i<=4; i++){
        deck.deal({ type: LocationType.PlayerHand, player: index + 1, x:i, rotation:true }, 1)
      }

/*
      for (let i=2; i<=3; i++){
        for (let j=2; j<=3; j++){
          deck.deal({ type: LocationType.PlayerBoard, player: index + 1, x:i, y:j, rotation:true }, 1)
        }
      }
*/

      // Surrounding cards
      for (let i=1; i<=4; i++){
        deck.deal({ type: LocationType.PlayerBoard, player: index + 1, x:i, y:1 }, 1)
        deck.deal({ type: LocationType.PlayerBoard, player: index + 1, x:i, y:4 }, 1)
      }
      for (let i=2; i<=3; i++){
        deck.deal({ type: LocationType.PlayerBoard, player: index + 1, x:1, y:i }, 1)
        deck.deal({ type: LocationType.PlayerBoard, player: index + 1, x:4, y:i }, 1)
      }
    }
  }

  start() {
    this.startSimultaneousRule(RuleId.PrepareGame)
  }
}
