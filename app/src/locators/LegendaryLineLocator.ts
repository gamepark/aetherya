/** @jsxImportSource @emotion/react */
import { ItemContext, ItemLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { LegendaryLineDescription } from './description/LegendaryLineDescription'
// import { legendaryCardDescription, spaceBetweenLegendaryCards } from '../material/LegendaryCardDescription'

export class LegendaryLineLocator extends ItemLocator {
  locationDescription = new LegendaryLineDescription()

  getPosition(item: MaterialItem, context: ItemContext) {
    return {
      ...this.locationDescription.getCoordinates(item.location, context),
      z:0.05
    }
  }
}

export const legendaryLineLocator = new LegendaryLineLocator()
