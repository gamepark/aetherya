import { MaterialGameSetup } from '@gamepark/rules-api'
import { AetheryaOptions } from './AetheryaOptions'
import { AetheryaRules } from './AetheryaRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class AetheryaSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, AetheryaOptions> {
  Rules = AetheryaRules

  setupMaterial(_options: AetheryaOptions) {
  }

  start() {
    this.startPlayerTurn(RuleId.PlayerTurn, this.game.players[0])
  }
}