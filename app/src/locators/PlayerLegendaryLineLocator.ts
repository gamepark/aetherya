/** @jsxImportSource @emotion/react */
import { DeckLocator } from '@gamepark/react-game'
import { PlayerLegendaryLineDescription } from './description/PlayerLegendaryLineDescription'

export class PlayerLegendaryLineLocator extends DeckLocator {
  locationDescription = new PlayerLegendaryLineDescription()
}

export const playerLegendaryLineLocator = new PlayerLegendaryLineLocator()
