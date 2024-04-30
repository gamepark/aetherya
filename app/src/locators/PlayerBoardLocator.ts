/** @jsxImportSource @emotion/react */
import { DeckLocator } from '@gamepark/react-game'
import { PlayerBoardDescription } from './description/PlayerBoardDescription'

export class PlayerBoardLocator extends DeckLocator {
  locationDescription = new PlayerBoardDescription()
  delta = { x: -0.04, y: -0.04 }
  coordinates = this.locationDescription.deckCoordinates
}

export const playerBoardLocator = new PlayerBoardLocator()
