import { MaterialRulesPart } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { score } from '../logic/Score'

export class ScoreRule extends MaterialRulesPart {
  onRuleStart() {
    let nbPlayers=this.game.players.length
    for (let i=0; i<nbPlayers; i++){
      let player=this.game.players[i]
      score.playerScore(
        player,
        this.material(MaterialType.KingdomCard),
        this.material(MaterialType.LegendCard)
      )
    }
    return [ this.endGame() ]
  }
}
