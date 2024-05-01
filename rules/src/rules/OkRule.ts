import { PlayerTurnRule } from '@gamepark/rules-api'

export class OkRule extends PlayerTurnRule {
  getPlayerMoves() {
    return []
  }
}
