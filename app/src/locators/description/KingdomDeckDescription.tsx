/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/aetherya/material/LocationType'
import { LocationContext, LocationDescription } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { kingdomCardDescription } from '../../material/KingdomCardDescription'

export class KingdomDeckDescription extends LocationDescription {
  height = kingdomCardDescription.height + 0.8
  width = kingdomCardDescription.width + 0.8
  borderRadius = kingdomCardDescription.borderRadius

  location = { type: LocationType.KingdomDeck }
  getCoordinates(_location: Location, _context: LocationContext) {
    return {
      x: this.deckCoordinates.x - 0.4,
      y: this.deckCoordinates.y - 0.4,
      z: 10
    }
  }

  deckCoordinates = { x: -5, y: 0, z: 0}
}