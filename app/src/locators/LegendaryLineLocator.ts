/** @jsxImportSource @emotion/react */
import { ItemContext, ItemLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { LegendaryLineDescription } from './description/LegendaryLineDescription'
import { legendaryCardDescription, spaceBetweenLegendaryCards } from '../material/LegendaryCardDescription'

export class LegendaryLineLocator extends ItemLocator {
  locationDescription = new LegendaryLineDescription()

  getPosition(item: MaterialItem, context: ItemContext) {
    const { x, y, z } = this.locationDescription.getCoordinates(item.location, context)
    const posX = item.location.x! % 4
    const posYa = (item.location.x! - posX)/4
    const posY = (posX==0) ? posYa-1 : posYa
    return {
      x: x + (legendaryCardDescription.width+spaceBetweenLegendaryCards)*(posX-1.5),
      y: y + (legendaryCardDescription.height+spaceBetweenLegendaryCards)*(posY-0.5),
      z
    }
  }
}

export const legendaryLineLocator = new LegendaryLineLocator()
