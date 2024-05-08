/** @jsxImportSource @emotion/react */
import { GridLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { PlayerBoardDescription } from './description/PlayerBoardDescription'
import { kingdomCardDescription, spaceBetweenKingdomCards } from '../material/KingdomCardDescription'

export class PlayerBoardLocator extends GridLocator {
  itemsPerLine = 4
  itemsGap = { x: kingdomCardDescription.width + spaceBetweenKingdomCards }
  linesGap = { y: kingdomCardDescription.height + spaceBetweenKingdomCards }

  locationDescription = new PlayerBoardDescription()

  getPosition(item: MaterialItem, context: ItemContext) {
    return {
      ...this.locationDescription.getCoordinates(item.location, context),
//      z:0.05
      z:0
    }
  }
}

export const playerBoardLocator = new PlayerBoardLocator()
