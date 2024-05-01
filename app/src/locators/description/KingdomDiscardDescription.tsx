/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/aetherya/material/LocationType'
import { LocationContext, LocationDescription } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { kingdomCardDescription } from '../../material/KingdomCardDescription'

export class KingdomDiscardDescription extends LocationDescription {
  height = kingdomCardDescription.height + 0.8
  width = kingdomCardDescription.width + 0.8
  borderRadius = kingdomCardDescription.borderRadius

  alwaysVisible = true
  extraCss = css`border: 0.05em solid white`

  location = { type: LocationType.KingdomDiscard }
  getCoordinates(_location: Location, _context: LocationContext) {
    return {
      x: this.discardCoordinates.x - 0.4,
      y: this.discardCoordinates.y - 0.4,
      z: 10
    }
  }

  discardCoordinates = { x: 5, y: 0, z: 0}
}
