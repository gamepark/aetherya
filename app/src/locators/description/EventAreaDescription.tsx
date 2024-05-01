/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/aetherya/material/LocationType'
import { LocationContext, LocationDescription } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { kingdomCardDescription } from '../../material/KingdomCardDescription'

export class EventAreaDescription extends LocationDescription {
  height = kingdomCardDescription.height
  width = kingdomCardDescription.width
  borderRadius = kingdomCardDescription.borderRadius

  alwaysVisible = true
  extraCss = css`border: 0.05em solid white`

  location = { type: LocationType.EventArea }
  getCoordinates(_location: Location, _context: LocationContext) {
    return {
      x: this.deckCoordinates.x,
      y: this.deckCoordinates.y,
      z: 10
    }
  }

  deckCoordinates = { x: 0, y: -10, z: 0}
}
