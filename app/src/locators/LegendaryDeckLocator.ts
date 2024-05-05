/** @jsxImportSource @emotion/react */
import { DeckLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { LegendaryDeckDescription } from './description/LegendaryDeckDescription'
import { tableDesign } from './position/TableDesign'

export class LegendaryDeckLocator extends DeckLocator {
  locationDescription = new LegendaryDeckDescription()

  getCoordinates(_item: MaterialItem, context: ItemContext) {
    return tableDesign.commonLegendaryDeckCoordinates(context)
  }
}

export const legendaryDeckLocator = new LegendaryDeckLocator()
