import {
  HiddenMaterialRules,
  HidingStrategy,
  MaterialItem,
  PositiveSequenceStrategy
} from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { ChooseCardRule } from './rules/ChooseCardRule'
import { ChooseBoardLocationRule } from './rules/ChooseBoardLocationRule'
import { PrepareGameRule } from './rules/PrepareGameRule'
import { RevealAllBoardCardsRule } from './rules/RevealAllBoardCardsRule'
import { ScoreRule } from './rules/ScoreRule'
import { ShuffleKingdomDeckRule } from './rules/ShuffleKingdomDeckRule'
import { OkRule } from './rules/OkRule'
import { ErrorRule } from './rules/ErrorRule'
import { RuleId } from './rules/RuleId'
import { PlayerId } from './PlayerId'
import { Score } from './logic/Score'

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
export class AetheryaRules extends HiddenMaterialRules<PlayerColor, MaterialType, LocationType> {
  rules = {
    [RuleId.PrepareGame]: PrepareGameRule,
    [RuleId.ChooseBoardLocation]: ChooseBoardLocationRule,
    [RuleId.ChooseCard]: ChooseCardRule,
    [RuleId.RevealAllBoardCards]: RevealAllBoardCardsRule,
    [RuleId.Score]: ScoreRule,
    [RuleId.ShuffleKingdomDeck]: ShuffleKingdomDeckRule,

    // For debugging only
    [RuleId.Ok]: OkRule,
    [RuleId.Error]: ErrorRule
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
      [LocationType.KingdomDiscard]: alwaysShow,
      [LocationType.PlayerBoard]: hideCardWhenNotRotated
    },
    [MaterialType.LegendaryCard]: {
      [LocationType.LegendaryDeck]: alwaysHide
    }
  }

  getScore(player: PlayerId) {
    let score=new Score()
//    return score.playerScore(player, this.game, this.playerBoard(player))
    return score.playerScore(player, this.material(MaterialType.KingdomCard))
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
