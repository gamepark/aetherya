/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/aetherya/material/LocationType'
import { LocationContext, LocationDescription } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { kingdomCardDescription } from '../../material/KingdomCardDescription'

export class KingdomDiscardDescription extends LocationDescription {
  height = kingdomCardDescription.height + 0.8
  width = kingdomCardDescription.width + 0.8
  borderRadius = kingdomCardDescription.borderRadius

  location = { type: LocationType.KingdomDiscard }
  getCoordinates(_location: Location, _context: LocationContext) {
    return {
      x: this.discardCoordinates.x - 0.4,
      y: this.discardCoordinates.y - 0.4,
      z: 10
    }
  }

  discardCoordinates = { x: -10, y: 4, z: 0}
}
