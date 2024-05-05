/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/aetherya/material/LocationType'
import { LocationContext, LocationDescription } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { legendaryCardDescription } from '../../material/LegendaryCardDescription'

export class LegendaryDeckDescription extends LocationDescription {
  height = legendaryCardDescription.height
  width = legendaryCardDescription.width
  borderRadius = legendaryCardDescription.borderRadius

  location = { type: LocationType.LegendaryDeck }
  getCoordinates(_location: Location, _context: LocationContext) {
    return {
      x: this.deckCoordinates.x,
      y: this.deckCoordinates.y,
      z: 10
    }
  }

  deckCoordinates = { x: -20, y: -27.5, z: 0}
}
