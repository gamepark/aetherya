/** @jsxImportSource @emotion/react */
import { DeckLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { KingdomDeckDescription } from './description/KingdomDeckDescription'
import { tableDesign } from './position/TableDesign'

export class KingdomDeckLocator extends DeckLocator {
  locationDescription = new KingdomDeckDescription()

  getCoordinates(_item: MaterialItem, context: ItemContext) {
    return tableDesign.kingdomDeckCoordinates(context)
  }
}

export const kingdomDeckLocator = new KingdomDeckLocator()
