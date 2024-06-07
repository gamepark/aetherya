/** @jsxImportSource @emotion/react */
import { DeckLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { LegendDeckDescription } from './description/LegendDeckDescription'
import { tableDesign } from './position/TableDesign'

export class LegendDeckLocator extends DeckLocator {
  locationDescription = new LegendDeckDescription()
  delta = { x: -0.04, y: -0.04, z: 0.1 }

  getCoordinates(_item: MaterialItem, context: ItemContext) {
    return tableDesign.commonLegendDeckCoordinates(context)
  }
}

export const legendDeckLocator = new LegendDeckLocator()
