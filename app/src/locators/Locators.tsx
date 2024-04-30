import { LocationType } from '@gamepark/aetherya/material/LocationType'
import { MaterialType } from '@gamepark/aetherya/material/MaterialType'
import { PlayerColor } from '@gamepark/aetherya/PlayerColor'
import { ItemLocator } from '@gamepark/react-game'
import { kingdomDeckLocator } from './KingdomDeckLocator'
import { kingdomDiscardLocator } from './KingdomDiscardLocator'
import { legendaryDeckLocator } from './LegendaryDeckLocator'
import { legendaryLineLocator } from './LegendaryLineLocator'
import { playerBoardLocator } from './PlayerBoardLocator'
import { playerLegendaryLineLocator } from './PlayerLegendaryLineLocator'
import { playerHandLocator } from './PlayerHandLocator'

export const Locators: Partial<Record<LocationType, ItemLocator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.KingdomDeck]: kingdomDeckLocator,
  [LocationType.KingdomDiscard]: kingdomDiscardLocator,
  [LocationType.LegendaryDeck]: legendaryDeckLocator,
  [LocationType.LegendaryLine]: legendaryLineLocator,
  [LocationType.PlayerBoard]: playerBoardLocator,
  [LocationType.PlayerLegendaryLine]: playerLegendaryLineLocator,
  [LocationType.PlayerHand]: playerHandLocator
}
