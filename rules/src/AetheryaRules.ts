import {
  HiddenMaterialRules,
  HidingStrategy,
  MaterialItem,
  PositiveSequenceStrategy
} from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { PlayerTurn } from './rules/PlayerTurn'
import { RuleId } from './rules/RuleId'
// import { PlayerId } from './PlayerId'

export const hideCardWhenNotRotated: HidingStrategy = (
  item: MaterialItem
) => {
  return item.location.rotation ? ['id'] : []
}

export const hideIfZPositive: HidingStrategy = (
  item: MaterialItem
) => {
  if (item.location.z === undefined) return ['id']
  return item.location.z > 0 ? [] : ['id']
}

export const alwaysHide: HidingStrategy = () => {
  return ['id']
}

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class AetheryaRules extends HiddenMaterialRules<PlayerColor, MaterialType, LocationType> {
  rules = {
    [RuleId.PlayerTurn]: PlayerTurn
  }

  locationsStrategies = {
    [MaterialType.KingdomCard]: {
      [LocationType.KingdomDeck]: new PositiveSequenceStrategy(),
      [LocationType.KingdomDiscard]: new PositiveSequenceStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.KingdomCard]: {
      [LocationType.KingdomDeck]: alwaysHide,
      [LocationType.PlayerBoard]: hideIfZPositive

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
