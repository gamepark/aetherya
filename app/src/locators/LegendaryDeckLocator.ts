/** @jsxImportSource @emotion/react */
import { DeckLocator } from '@gamepark/react-game'
import { LegendaryDeckDescription } from './description/LegendaryDeckDescription'

export class LegendaryDeckLocator extends DeckLocator {
  locationDescription = new LegendaryDeckDescription()
  delta = { x: -0.04, y: -0.04 }
  coordinates = this.locationDescription.deckCoordinates
}

export const legendaryDeckLocator = new LegendaryDeckLocator()
