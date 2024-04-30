/** @jsxImportSource @emotion/react */
import { DeckLocator } from '@gamepark/react-game'
import { PlayerHandDescription } from './description/PlayerHandDescription'

export class PlayerHandLocator extends DeckLocator {
  locationDescription = new PlayerHandDescription()
  delta = { x: -0.04, y: -0.04 }
  coordinates = this.locationDescription.deckCoordinates
}

export const playerHandLocator = new PlayerHandLocator()
