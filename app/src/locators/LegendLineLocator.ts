/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/aetherya/material/LocationType'
import { FlexLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { legendCardDescription } from '../material/LegendCardDescription'

export class LegendLineLocator extends FlexLocator {

  getLocations(_context: MaterialContext): Location[] {
    const locations: Location[] = []
    for (let i = 0; i < 8; i++) {
      locations.push({
        type: LocationType.LegendLine,
        x: i
      })
    }
    return locations
  }

  getAreaCoordinates(_: Location, { rules: { players } }: MaterialContext) {
    switch (players.length) {
      case 1:
        return { x: -25, y: -25 }
      case 2:
        return { y: -25 }
      case 3:
        return { x: 25, y: 3.7 }
      default:
        return { x: 25 }
    }
  }

  getCoordinates(location: Location, context: MaterialContext) {
    const { x = 0, y = 0 } = this.getAreaCoordinates(location, context)
    return { x: x - this.gap.x * 1.5, y: y - this.lineGap.y * 0.5 }
  }

  gap = { x: legendCardDescription.width + 0.5 }
  lineGap = { y: legendCardDescription.height + 0.5 }
  lineSize = 4
  maxLines = 2
}

export const legendLineLocator = new LegendLineLocator()
