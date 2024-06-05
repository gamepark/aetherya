/** @jsxImportSource @emotion/react */
import { GridLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { kingdomCardDescription, spaceBetweenKingdomCards } from '../material/KingdomCardDescription'
import { PlayerBoardDescription } from './description/PlayerBoardDescription'
import { tableDesign } from './position/TableDesign'

export class PlayerBoardLocator extends GridLocator {
  itemsPerLine = 4
  itemsGap = { x: kingdomCardDescription.width + spaceBetweenKingdomCards }
  linesGap = { y: kingdomCardDescription.height + spaceBetweenKingdomCards }

  locationDescription = new PlayerBoardDescription()

  getPosition(item: MaterialItem, context: ItemContext) {
    return {
      ...this.locationDescription.getCoordinates(item.location, context),
      z: 0.05
    }
  }

  getRotateZ(item: MaterialItem, context: ItemContext): number {
    if (tableDesign.isBoardRotated(item.location, context))
      return 180
    return 0
  }
}

export const playerBoardLocator = new PlayerBoardLocator()
