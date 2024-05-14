/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/aetherya/material/LocationType'
import { LocationContext, LocationDescription } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { legendCardDescription } from '../../material/LegendCardDescription'
import { tableDesign } from '../position/TableDesign'

export class LegendDeckDescription extends LocationDescription {
  height = legendCardDescription.height
  width = legendCardDescription.width
  borderRadius = legendCardDescription.borderRadius

  alwaysVisible = true

  location = { type: LocationType.LegendDeck }

  getCoordinates(_location: Location, context: LocationContext) {
    const baseCoordinates=tableDesign.commonLegendDeckCoordinates(context)
    return {
      x: baseCoordinates.x,
      y: baseCoordinates.y,
      z: 0
    }
  }
}
