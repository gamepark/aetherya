import { LocationType } from '@gamepark/aetherya/material/LocationType'
import { MaterialType } from '@gamepark/aetherya/material/MaterialType'
import { PlayerColor } from '@gamepark/aetherya/PlayerColor'
import { ItemLocator } from '@gamepark/react-game'
import { kingdomDeckLocator } from './KingdomDeckLocator'
import { kingdomDiscardLocator } from './KingdomDiscardLocator'
import { legendDeckLocator } from './LegendDeckLocator'
import { legendLineLocator } from './LegendLineLocator'
import { playerBoardLocator } from './PlayerBoardLocator'
import { playerHandLocator } from './PlayerHandLocator'
import { playerLegendLineLocator } from './PlayerLegendLineLocator'
import { eventAreaLocator } from './EventAreaLocator'
import { scoreSheetLocator } from './ScoreSheetLocator'
import { scoreSheetBoxLocator } from './ScoreSheetBoxLocator'

export const Locators: Partial<Record<LocationType, ItemLocator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.KingdomDeck]: kingdomDeckLocator,
  [LocationType.KingdomDiscard]: kingdomDiscardLocator,
  [LocationType.LegendDeck]: legendDeckLocator,
  [LocationType.LegendLine]: legendLineLocator,
  [LocationType.PlayerBoard]: playerBoardLocator,
  [LocationType.PlayerLegendLine]: playerLegendLineLocator,
  [LocationType.EventArea]: eventAreaLocator,
  [LocationType.ScoreSheet]: scoreSheetLocator,
  [LocationType.ScoreSheetBox]: scoreSheetBoxLocator,
  [LocationType.PlayerHand]: playerHandLocator
}
