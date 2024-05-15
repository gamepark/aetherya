import { LocationType } from '@gamepark/aetherya/material/LocationType'
import { MaterialType } from '@gamepark/aetherya/material/MaterialType'
import { PlayerId } from '@gamepark/aetherya/PlayerId'
import { ItemLocator } from '@gamepark/react-game'
import { kingdomDeckLocator } from './KingdomDeckLocator'
import { kingdomDiscardLocator } from './KingdomDiscardLocator'
import { legendDeckLocator } from './LegendDeckLocator'
import { legendLineLocator } from './LegendLineLocator'
import { playerBoardLocator } from './PlayerBoardLocator'
import { playerHandLocator } from './PlayerHandLocator'
import { playerLegendLineLocator } from './PlayerLegendLineLocator'
import { scoreSheetBoxLocator } from './ScoreSheetBoxLocator'
import { scoreSheetLocator } from './ScoreSheetLocator'

export const Locators: Partial<Record<LocationType, ItemLocator<PlayerId, MaterialType, LocationType>>> = {
  [LocationType.KingdomDeck]: kingdomDeckLocator,
  [LocationType.KingdomDiscard]: kingdomDiscardLocator,
  [LocationType.LegendDeck]: legendDeckLocator,
  [LocationType.LegendLine]: legendLineLocator,
  [LocationType.PlayerBoard]: playerBoardLocator,
  [LocationType.PlayerLegendLine]: playerLegendLineLocator,
  [LocationType.ScoreSheet]: scoreSheetLocator,
  [LocationType.ScoreSheetBox]: scoreSheetBoxLocator,
  [LocationType.PlayerHand]: playerHandLocator
}
