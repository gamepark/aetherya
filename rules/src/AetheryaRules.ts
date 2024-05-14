import {
  CompetitiveScore,
  HiddenMaterialRules,
  HidingStrategy, MaterialGame,
  MaterialItem, MaterialMove,
  PositiveSequenceStrategy
} from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { ChooseCardRule } from './rules/ChooseCardRule'
import { NextPlayerRule } from './rules/NextPlayerRule'
import { PrepareGameRule } from './rules/PrepareGameRule'
import { RevealAllBoardCardsRule } from './rules/RevealAllBoardCardsRule'
import { ScoreRule } from './rules/ScoreRule'
import { ShuffleKingdomDeckRule } from './rules/ShuffleKingdomDeckRule'
import { RuleId } from './rules/RuleId'
import { PlayerId } from './PlayerId'
import { score, PlayerScore } from './logic/Score'

export const hideCardWhenNotRotated: HidingStrategy = (
  item: MaterialItem
) => {
  return item.location.rotation ? [] : ['id']
}

export const alwaysHide: HidingStrategy = () => {
  return ['id']
}

export const alwaysShow: HidingStrategy = () => {
  return []
}

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class AetheryaRules extends HiddenMaterialRules<PlayerColor, MaterialType, LocationType>
  implements CompetitiveScore<MaterialGame<PlayerColor, MaterialType, LocationType>, MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerId> {

  rules = {
    [RuleId.PrepareGame]: PrepareGameRule,
    [RuleId.ChooseCard]: ChooseCardRule,
    [RuleId.RevealAllBoardCards]: RevealAllBoardCardsRule,
    [RuleId.Score]: ScoreRule,
    [RuleId.ShuffleKingdomDeck]: ShuffleKingdomDeckRule,
    [RuleId.NextPlayer]: NextPlayerRule
  }

  locationsStrategies = {
    [MaterialType.KingdomCard]: {
      [LocationType.KingdomDeck]: new PositiveSequenceStrategy(),
      [LocationType.KingdomDiscard]: new PositiveSequenceStrategy(),
      [LocationType.PlayerHand]: new PositiveSequenceStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.KingdomCard]: {
      [LocationType.KingdomDeck]: alwaysHide,
      [LocationType.KingdomDiscard]: alwaysShow,
      [LocationType.PlayerBoard]: hideCardWhenNotRotated
    },
    [MaterialType.LegendCard]: {
      [LocationType.LegendDeck]: alwaysHide
    }
  }

  getScore(player: PlayerId) {
    return score.playerScore(
      player,
      this.material(MaterialType.KingdomCard),
      this.material(MaterialType.LegendCard)
    )
  }

  getTieBreaker(tieBreaker: number, player: PlayerId): number | undefined {
    if (tieBreaker === 1) {
      // The highest score among the 7 categories is used
      // Otherwise the next highest score, etc.
      let scoreDetails:PlayerScore = score.detailedPlayerScore(
        player,
        this.material(MaterialType.KingdomCard),
        this.material(MaterialType.LegendCard)
      )
      let values=[
        scoreDetails.elfPoints,
        scoreDetails.dwarfPoints,
        scoreDetails.humanPoints,
        scoreDetails.goblinPoints,
        scoreDetails.dragonPoints,
        scoreDetails.legendPoints,
        scoreDetails.conflictPoints
      ]
      // Order values - smallest to highest - Numeric sort
      values.sort(function(a,b){return a-b})

      // Values are aggregated
      // Negative values are supported with (100+value)
      let res=0
      for (let i=0; i<7; i++){
        res=(res*1000)+(100+values[6-i])
      }
      return res
    }
    return
  }

  playerBoard(player:number){
    return this.material(MaterialType.KingdomCard)
      .location(LocationType.PlayerBoard)
      .player(player)
  }

  itemsCanMerge() {
    return false
  }
}
