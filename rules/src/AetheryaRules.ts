import {
  HiddenMaterialRules,
  HidingStrategy,
//  LocationStrategy,
  MaterialItem,
  PositiveSequenceStrategy
} from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { ChooseLegendaryCardRule } from './rules/ChooseLegendaryCardRule'
import { ChooseBoardLocationRule } from './rules/ChooseBoardLocationRule'
import { PrepareGameRule } from './rules/PrepareGameRule'
import { RevealAllBoardCardsRule } from './rules/RevealAllBoardCardsRule'
import { ScoreRule } from './rules/ScoreRule'
import { SwapBoardCardAndDiscardRule } from './rules/SwapBoardCardAndDiscardRule'
import { ShuffleKingdomDeckRule } from './rules/ShuffleKingdomDeckRule'
import { OkRule } from './rules/OkRule'
import { ErrorRule } from './rules/ErrorRule'
import { RuleId } from './rules/RuleId'
// import { PlayerId } from './PlayerId'

export const hideCardWhenNotRotated: HidingStrategy = (
  item: MaterialItem
) => {
  return item.location.rotation ? ['id'] : []
}

export const alwaysHide: HidingStrategy = () => {
  return ['id']
}

export const alwaysShow: HidingStrategy = () => {
  return []
}

export const showIfZPositive: HidingStrategy = (
  item: MaterialItem
) => {
  if (item.location.z === undefined) return ['id']
  return item.location.z > 0 ? [] : ['id']
}

export const showIfZPositiveOrRotated: HidingStrategy = (
  item: MaterialItem
) => {
  if (item.location.rotation) return []
  if (item.location.z === undefined) return ['id']
  return item.location.z > 0 ? [] : ['id']
}

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class AetheryaRules extends HiddenMaterialRules<PlayerColor, MaterialType, LocationType> {
  rules = {
    [RuleId.PrepareGame]: PrepareGameRule,
    [RuleId.ChooseBoardLocation]: ChooseBoardLocationRule,
    [RuleId.ChooseLegendaryCard]: ChooseLegendaryCardRule,
    [RuleId.RevealAllBoardCards]: RevealAllBoardCardsRule,
    [RuleId.Score]: ScoreRule,
    [RuleId.SwapBoardCardAndDiscard]: SwapBoardCardAndDiscardRule,
    [RuleId.ShuffleKingdomDeck]: ShuffleKingdomDeckRule,

    // For debugging only
    [RuleId.Ok]: OkRule,
    [RuleId.Error]: ErrorRule
  }

  locationsStrategies = {
    [MaterialType.KingdomCard]: {
      [LocationType.KingdomDeck]: new PositiveSequenceStrategy(),
      [LocationType.KingdomDiscard]: new PositiveSequenceStrategy()
//      [LocationType.KingdomDeck]: LocationStrategy,
//      [LocationType.KingdomDiscard]: LocationStrategy
    }
  }

  hidingStrategies = {
    [MaterialType.KingdomCard]: {
      [LocationType.KingdomDeck]: alwaysHide,
      [LocationType.KingdomDiscard]: alwaysShow,
      [LocationType.PlayerBoard]: showIfZPositive

//      [LocationType.KingdomDiscard]: never,
//      [LocationType.LegendaryLine]: never,
//      [LocationType.PlayerLegendaryLine]: never,
//      [LocationType.PlayerHand]: never
    },
    [MaterialType.LegendaryCard]: {
      [LocationType.LegendaryDeck]: alwaysHide
    }
  }

  itemsCanMerge() {
    return false
  }
}
