import { PlayerTurnRule } from '@gamepark/rules-api'

export class ErrorRule extends PlayerTurnRule {
  getPlayerMoves() {
    return []
  }
}
