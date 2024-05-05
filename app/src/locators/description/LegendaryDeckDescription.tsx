/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/aetherya/material/LocationType'
import { LocationContext, LocationDescription } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { legendaryCardDescription } from '../../material/LegendaryCardDescription'
import { tableDesign } from '../position/TableDesign'

export class LegendaryDeckDescription extends LocationDescription {
  height = legendaryCardDescription.height
  width = legendaryCardDescription.width
  borderRadius = legendaryCardDescription.borderRadius

  alwaysVisible = true
  extraCss = css`border: 0.05em solid white`

  location = { type: LocationType.LegendaryDeck }

  getCoordinates(_location: Location, context: LocationContext) {
    const baseCoordinates=tableDesign.commonLegendaryDeckCoordinates(context)
    return {
      x: baseCoordinates.x,
      y: baseCoordinates.y,
      z: 10
    }
  }
}
