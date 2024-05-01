import { PlayerTurnRule } from '@gamepark/rules-api'

export class ScoreRule extends PlayerTurnRule {
  getPlayerMoves() {
    return []
  }
}
