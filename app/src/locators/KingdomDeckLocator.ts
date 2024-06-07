/** @jsxImportSource @emotion/react */
import { DeckLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { KingdomDeckDescription } from './description/KingdomDeckDescription'
import { tableDesign } from './position/TableDesign'

export class KingdomDeckLocator extends DeckLocator {
  locationDescription = new KingdomDeckDescription()
  delta = { x: -0.04, y: -0.04, z: 0.1 }

  getCoordinates(_item: MaterialItem, context: ItemContext) {
    return tableDesign.kingdomDeckCoordinates(context)
  }
}

export const kingdomDeckLocator = new KingdomDeckLocator()
