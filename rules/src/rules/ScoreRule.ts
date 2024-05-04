import { MaterialRulesPart } from '@gamepark/rules-api'
//import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Score } from '../logic/Score'

export class ScoreRule extends MaterialRulesPart {
  onRuleStart() {
    let score=new Score()
    let nbPlayers=this.game.players.length
    for (let i=0; i<nbPlayers; i++){
      let player=this.game.players[i]
      score.playerScore(player, this.material(MaterialType.KingdomCard))
    }
    return [ this.rules().endGame() ]
  }
}
