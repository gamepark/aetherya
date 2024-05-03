/** @jsxImportSource @emotion/react */
import { ItemContext, ItemLocator } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'

export class ScoreSheetLocator extends ItemLocator {
  getPosition(_item: MaterialItem, _context: ItemContext): Coordinates {
    return { x: 25, y: -27, z: 10}
  }
}

export const scoreSheetLocator = new ScoreSheetLocator()
