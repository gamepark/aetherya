/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/aetherya/material/LocationType'
import { LocationContext, LocationDescription } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { legendaryCardDescription } from '../../material/LegendaryCardDescription'

export class LegendaryDeckDescription extends LocationDescription {
  height = legendaryCardDescription.height + 0.8
  width = legendaryCardDescription.width + 0.8
  borderRadius = legendaryCardDescription.borderRadius

  location = { type: LocationType.LegendaryDeck }
  getCoordinates(_location: Location, _context: LocationContext) {
    return {
      x: this.deckCoordinates.x - 0.4,
      y: this.deckCoordinates.y - 0.4,
      z: 10
    }
  }

  deckCoordinates = { x: -20, y: -27, z: 0}
}