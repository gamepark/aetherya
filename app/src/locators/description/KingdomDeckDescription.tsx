/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/aetherya/material/LocationType'
import { LocationContext, LocationDescription } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { kingdomCardDescription } from '../../material/KingdomCardDescription'
import { tableDesign } from '../position/TableDesign'

export class KingdomDeckDescription extends LocationDescription {
  height = kingdomCardDescription.height
  width = kingdomCardDescription.width
  borderRadius = kingdomCardDescription.borderRadius

  alwaysVisible = true
  extraCss = css`border: 0.05em solid white`

  location = { type: LocationType.KingdomDeck }
  getCoordinates(_location: Location, context: LocationContext) {
    const baseCoordinates=tableDesign.kingdomDeckCoordinates(context)
    return {
      x: baseCoordinates.x,
      y: baseCoordinates.y,
      z: -1
    }
  }
}
