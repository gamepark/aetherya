/** @jsxImportSource @emotion/react */
import { DeckLocator } from '@gamepark/react-game'
import { PlayerLegendaryLineDescription } from './description/PlayerLegendaryLineDescription'

export class PlayerLegendaryLineLocator extends DeckLocator {
  locationDescription = new PlayerLegendaryLineDescription()
//  delta = { x: -0.04, y: -0.04 }
//  coordinates = this.locationDescription.deckCoordinates
}

export const playerLegendaryLineLocator = new PlayerLegendaryLineLocator()
