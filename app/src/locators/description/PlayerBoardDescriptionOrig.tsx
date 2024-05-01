/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/aetherya/material/LocationType'
import { LocationContext, LocationDescription } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { legendaryCardDescription } from '../../material/LegendaryCardDescription'

export class PlayerBoardDescription extends LocationDescription {
  height = legendaryCardDescription.height*4 + 3
  width = legendaryCardDescription.width*4 + 3
  borderRadius = legendaryCardDescription.borderRadius

  alwaysVisible = true
  extraCss = css`border: 0.05em solid white`

  location = { type: LocationType.PlayerBoard }
  getCoordinates(_location: Location, _context: LocationContext) {
    return {
      x: this.deckCoordinates.x - 0.4,
      y: this.deckCoordinates.y - 0.4,
      z: 10
    }
  }

  deckCoordinates = { x: 0, y: 30, z: 0}
}
