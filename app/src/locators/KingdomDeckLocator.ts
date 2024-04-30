/** @jsxImportSource @emotion/react */
import { DeckLocator } from '@gamepark/react-game'
import { KingdomDeckDescription } from './description/KingdomDeckDescription'

export class KingdomDeckLocator extends DeckLocator {
  locationDescription = new KingdomDeckDescription()
  delta = { x: -0.04, y: -0.04 }
  coordinates = this.locationDescription.deckCoordinates
}

export const kingdomDeckLocator = new KingdomDeckLocator()
