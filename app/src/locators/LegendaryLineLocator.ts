/** @jsxImportSource @emotion/react */
import { DeckLocator } from '@gamepark/react-game'
import { LegendaryLineDescription } from './description/LegendaryLineDescription'

export class LegendaryLineLocator extends DeckLocator {
  locationDescription = new LegendaryLineDescription()
  delta = { x: -0.04, y: -0.04 }
  coordinates = this.locationDescription.deckCoordinates
}

export const legendaryLineLocator = new LegendaryLineLocator()
