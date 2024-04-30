import { MaterialGameSetup } from '@gamepark/rules-api'
import { AetheryaOptions } from './AetheryaOptions'
import { AetheryaRules } from './AetheryaRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { RuleId } from './rules/RuleId'
import { kingdomCards } from './material/KingdomCard'

/**
 * This class creates a new Game based on the game options
 */
export class AetheryaSetup extends MaterialGameSetup<number, MaterialType, LocationType, AetheryaOptions> {
  Rules = AetheryaRules

  setupMaterial(options: AetheryaOptions) {
    this.setupKingdomCards(options)
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

  start() {
    this.startPlayerTurn(RuleId.PlayerTurn, this.game.players[0])
  }
}
