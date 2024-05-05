/** @jsxImportSource @emotion/react */
import { ItemLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { PlayerLegendLineDescription } from './description/PlayerLegendLineDescription'

export class PlayerLegendLineLocator extends ItemLocator {
  locationDescription = new PlayerLegendLineDescription()

  getPosition(item: MaterialItem, context: ItemContext) {
    return this.locationDescription.getCoordinates(item.location, context)
  }
}

export const playerLegendLineLocator = new PlayerLegendLineLocator()
