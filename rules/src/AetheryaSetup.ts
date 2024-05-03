import { MaterialGameSetup } from '@gamepark/rules-api'
import { AetheryaOptions } from './AetheryaOptions'
import { AetheryaRules } from './AetheryaRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { RuleId } from './rules/RuleId'
import { kingdomCards } from './material/KingdomCard'
import { legendaryCards } from './material/LegendaryCard'

/**
 * This class creates a new Game based on the game options
 */
export class AetheryaSetup extends MaterialGameSetup<number, MaterialType, LocationType, AetheryaOptions> {
  Rules = AetheryaRules

  setupMaterial(options: AetheryaOptions) {
    this.setupKingdomCards(options)
    this.setupLegendaryCards()
    this.setupLegendaryLine()
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

  setupLegendaryCards() {
    const cards=legendaryCards.map((legendaryCard) => ({
      id: legendaryCard,
      location: {
        type: LocationType.LegendaryDeck
      }
    }))

    this.material(MaterialType.LegendaryCard).createItems(cards)
    this.material(MaterialType.LegendaryCard).shuffle()
  }

  setupLegendaryLine() {
    const deck = this.material(MaterialType.LegendaryCard).deck()
    for (let i=1; i<=8; i++){
      deck.deal({ type: LocationType.LegendaryLine, x:i }, 1)
    }
  }

  setupPlayers(options: AetheryaOptions) {
    const deck = this.material(MaterialType.KingdomCard).deck()
    for (let index = 0; index < options.players; index++) {
      // z = 1 for visible cards
      // z = 0 for hidden cards
      for (let i=2; i<=3; i++){
        for (let j=2; j<=3; j++){
          deck.deal({ type: LocationType.PlayerBoard, player: index + 1, x:i, y:j, z:1, rotation:true }, 1)
        }
      }

      // Quicker start
      for (let i=1; i<=4; i++){
        deck.deal({ type: LocationType.PlayerBoard, player: index + 1, x:i, y:1, z:0 }, 1)
        deck.deal({ type: LocationType.PlayerBoard, player: index + 1, x:i, y:4, z:0 }, 1)
      }
      for (let i=2; i<=3; i++){
        deck.deal({ type: LocationType.PlayerBoard, player: index + 1, x:1, y:i, z:0 }, 1)
        deck.deal({ type: LocationType.PlayerBoard, player: index + 1, x:4, y:i, z:0 }, 1)
      }
    }
  }

  start() {
//    this.startPlayerTurn(RuleId.PrepareGame, this.game.players[0])
    this.startPlayerTurn(RuleId.ChooseLegendaryCard, this.game.players[0])
  }
}
