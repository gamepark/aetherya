/** @jsxImportSource @emotion/react */
import { ItemLocator } from '@gamepark/react-game'
import { EventAreaDescription } from './description/EventAreaDescription'

export class EventAreaLocator extends ItemLocator {
  locationDescription = new EventAreaDescription()
  coordinates = this.locationDescription.deckCoordinates

  getPosition() /*item: MaterialItem, { type }: ItemContext : Coordinates */ {
    return this.coordinates
  }
}

export const eventAreaLocator = new EventAreaLocator()
