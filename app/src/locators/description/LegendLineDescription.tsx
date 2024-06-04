/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/aetherya/material/LocationType'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { legendCardDescription } from '../../material/LegendCardDescription'
import { tableDesign } from '../position/TableDesign'

export class LegendLineDescription extends LocationDescription {
  height = legendCardDescription.height
  width = legendCardDescription.width
  borderRadius = legendCardDescription.borderRadius

  alwaysVisible = true

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

  getCoordinates(location: Location, context: LocationContext) {
    const baseCoordinates = this.getLegendLineCardCoordinates(location, context)
    const posX = (location.x!) % 4
    const posY = (location.x! - posX) / 4
    return {
      x: baseCoordinates.x + (legendCardDescription.width + 0.5) * (posX - 1.5),
      y: baseCoordinates.y + (legendCardDescription.height + 0.5) * (posY - 0.5),
      z: 0
    }
  }

  getLegendLineCardCoordinates(_location: Location, context: LocationContext) {
    return tableDesign.commonLegendLineCoordinates(context)
  }
}
