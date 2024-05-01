import { PlayerTurnRule } from '@gamepark/rules-api'

export class RevealAllBoardCardsRule extends PlayerTurnRule {
  getPlayerMoves() {
    return []
  }
}
