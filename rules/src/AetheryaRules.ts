import {
  CompetitiveScore,
  FillGapStrategy,
  HiddenMaterialRules,
  hideItemId,
  HidingStrategy,
  MaterialGame,
  MaterialItem,
  MaterialMove,
  PositiveSequenceStrategy
} from '@gamepark/rules-api'
import { PlayerScore, score } from './logic/Score'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerId } from './PlayerId'
import { AcquireLegendRule } from './rules/AcquireLegendRule'
import { DrawOrPlaceDiscardCardRule } from './rules/DrawOrPlaceDiscardCardRule'
import { PlaceDiscardCardRule } from './rules/PlaceDiscardCardRule'
import { PrepareGameRule } from './rules/PrepareGameRule'
import { RevealAllBoardCardsRule } from './rules/RevealAllBoardCardsRule'
import { RuleId } from './rules/RuleId'
import { ScoreRule } from './rules/ScoreRule'

export const hideCardWhenNotRotated: HidingStrategy = (
  item: MaterialItem
) => {
  return item.location.rotation ? [] : ['id']
}

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class AetheryaRules extends HiddenMaterialRules<PlayerId, MaterialType, LocationType>
  implements CompetitiveScore<MaterialGame<PlayerId, MaterialType, LocationType>, MaterialMove<PlayerId, MaterialType, LocationType>, PlayerId> {

  rules = {
    [RuleId.PrepareGame]: PrepareGameRule,
    [RuleId.DrawOrPlaceDiscardCard]: DrawOrPlaceDiscardCardRule,
    [RuleId.PlaceDiscardCard]: PlaceDiscardCardRule,
    [RuleId.AcquireLegend]: AcquireLegendRule,
    [RuleId.RevealAllBoardCards]: RevealAllBoardCardsRule,
    [RuleId.Score]: ScoreRule
  }

  locationsStrategies = {
    [MaterialType.KingdomCard]: {
      [LocationType.KingdomDeck]: new PositiveSequenceStrategy(),
      [LocationType.KingdomDiscard]: new PositiveSequenceStrategy(),
      [LocationType.PlayerHand]: new PositiveSequenceStrategy()
    },
    [MaterialType.LegendCard]: {
      [LocationType.LegendLine]: new FillGapStrategy(),
      [LocationType.PlayerLegendLine]: new PositiveSequenceStrategy(),
    }
  }

  hidingStrategies = {
    [MaterialType.KingdomCard]: {
      [LocationType.KingdomDeck]: hideItemId,
      [LocationType.PlayerBoard]: hideCardWhenNotRotated
    },
    [MaterialType.LegendCard]: {
      [LocationType.LegendDeck]: hideItemId
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
    // The highest score among the 7 categories is used
    // Otherwise the next highest score, etc.
    const scoreDetails: PlayerScore = score.detailedPlayerScore(
      player,
      this.material(MaterialType.KingdomCard),
      this.material(MaterialType.LegendCard)
    )
    const values = [
      scoreDetails.elfPoints,
      scoreDetails.dwarfPoints,
      scoreDetails.humanPoints,
      scoreDetails.goblinPoints,
      scoreDetails.dragonPoints,
      scoreDetails.legendPoints,
      scoreDetails.conflictPoints
    ]
    // Order values - smallest to highest - Numeric sort
    values.sort(function (a, b) {
      return a - b
    })

    return values[tieBreaker - 1]
  }

  itemsCanMerge() {
    return false
  }
}
