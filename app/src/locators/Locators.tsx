import { LocationType } from '@gamepark/aetherya/material/LocationType'
import { MaterialType } from '@gamepark/aetherya/material/MaterialType'
import { PlayerColor } from '@gamepark/aetherya/PlayerColor'
import { ItemLocator } from '@gamepark/react-game'

export const Locators: Partial<Record<LocationType, ItemLocator<PlayerColor, MaterialType, LocationType>>> = {}
