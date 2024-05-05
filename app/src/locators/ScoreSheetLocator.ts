/** @jsxImportSource @emotion/react */
import { ItemContext, ItemLocator } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { tableDesign } from './position/TableDesign'

export class ScoreSheetLocator extends ItemLocator {
  getPosition(_item: MaterialItem, context: ItemContext): Coordinates {
    return tableDesign.scoreSheetCoordinates(context)
  }
}

export const scoreSheetLocator = new ScoreSheetLocator()
