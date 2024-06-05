/** @jsxImportSource @emotion/react */
import { ItemContext, ItemLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { PlayerHandDescription } from './description/PlayerHandDescription'
import { tableDesign } from './position/TableDesign'

export class PlayerHandLocator extends ItemLocator {
  locationDescription = new PlayerHandDescription()

  getPosition(item: MaterialItem, context: ItemContext) {
    return {
      ...this.locationDescription.getCoordinates(item.location, context),
      z:2.05
    }
  }

  getRotateZ(item: MaterialItem, context: ItemContext): number {
    if (tableDesign.isBoardRotated(item.location, context))
      return 180
    return 0
  }
}

export const playerHandLocator = new PlayerHandLocator()
