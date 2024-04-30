/** @jsxImportSource @emotion/react */
import { DeckLocator } from '@gamepark/react-game'
import { KingdomDiscardDescription } from './description/KingdomDiscardDescription'

export class KingdomDiscardLocator extends DeckLocator {
  locationDescription = new KingdomDiscardDescription()
  delta = { x: -0.04, y: -0.04 }
  coordinates = this.locationDescription.discardCoordinates
}

export const kingdomDiscardLocator = new KingdomDiscardLocator()
