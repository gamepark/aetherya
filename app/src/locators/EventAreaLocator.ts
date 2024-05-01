/** @jsxImportSource @emotion/react */
import { DeckLocator } from '@gamepark/react-game'
import { EventAreaDescription } from './description/EventAreaDescription'

export class EventAreaLocator extends DeckLocator {
  locationDescription = new EventAreaDescription()
  delta = { x: -0.04, y: -0.04 }
  coordinates = this.locationDescription.deckCoordinates
}

export const eventAreaLocator = new EventAreaLocator()
