/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/aetherya/material/LocationType'
import { MaterialType } from '@gamepark/aetherya/material/MaterialType'
import { getRelativePlayerIndex, Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { kingdomCardDescription } from '../material/KingdomCardDescription'
import { PlayerBoardDescription } from './description/PlayerBoardDescription'

class PlayerBoardLocator extends Locator {

  locationDescription = new PlayerBoardDescription()

  getLocations(context: MaterialContext): Location[] {
    const { rules } = context
    const locations: Location[] = []

    for (const player of rules.players) {
      const cards = rules.material(MaterialType.KingdomCard).location(LocationType.PlayerBoard).player(player)
      for (let x = 2; x <= 3; x++) {
        for (let y = 2; y <= 3; y++) {
          if (cards.location(l => l.x === x && l.y === y).length === 0) {
            locations.push({ type: LocationType.PlayerBoard, player, x, y })
          }
        }
      }
    }

    return locations
  }

  getCoordinates(location: Location, context: MaterialContext) {
    const index = getRelativePlayerIndex(context, location.player)
    switch (context.rules.players.length) {
      case 1:
        return { x: -25 }
      case 2:
        return { x: index === 0 ? -25 : 25 }
      case 3:
        return {
          x: index === 1 ? 25 : -25,
          y: index === 2 ? 20 : -20
        }
      case 4:
      default:
        return {
          x: index === 0 || index === 3 ? -15 : 20,
          y: index < 2 ? -25 : -25
        }
    }
  }

  gapX = kingdomCardDescription.width + 0.5
  gapY = kingdomCardDescription.height + 0.5

  getLocationCoordinates(location: Location, context: MaterialContext) {
    const { x = 0, y = 0 } = this.getCoordinates(location, context)
    return {
      x: x + this.gapX * (location.x! - 2.5),
      y: y + this.gapY * (location.y! - 2.5)
    }
  }
}

export const playerBoardLocator = new PlayerBoardLocator()
