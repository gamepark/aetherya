/** @jsxImportSource @emotion/react */
import { ItemContext, ItemLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { LegendLineDescription } from './description/LegendLineDescription'

export class LegendLineLocator extends ItemLocator {
  locationDescription = new LegendLineDescription()

  getPosition(item: MaterialItem, context: ItemContext) {
    return {
      ...this.locationDescription.getCoordinates(item.location, context),
      z:0.05
    }
  }
}

export const legendLineLocator = new LegendLineLocator()
