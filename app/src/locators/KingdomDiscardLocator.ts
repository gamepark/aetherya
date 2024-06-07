/** @jsxImportSource @emotion/react */
import { DeckLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { KingdomDiscardDescription } from './description/KingdomDiscardDescription'
import { tableDesign } from './position/TableDesign'

export class KingdomDiscardLocator extends DeckLocator {
  locationDescription = new KingdomDiscardDescription()

  getCoordinates(_item: MaterialItem, context: ItemContext) {
    return tableDesign.kingdomDiscardCoordinates(context)
  }

  navigationSorts=[]
}

export const kingdomDiscardLocator = new KingdomDiscardLocator()
