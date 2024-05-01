/** @jsxImportSource @emotion/react */
import { ItemContext, ItemLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { PlayerBoardDescription } from './description/PlayerBoardDescription'
import { kingdomCardDescription, spaceBetweenKingdomCards } from '../material/KingdomCardDescription'

export class PlayerBoardLocator extends ItemLocator {
  locationDescription = new PlayerBoardDescription()

  getPosition(item: MaterialItem, context: ItemContext) {
    const { x, y, z } = this.locationDescription.getCoordinates(item.location, context)
    const posX = item.location.x!
    const posY = item.location.y!
    return {
      x: x + (kingdomCardDescription.width+spaceBetweenKingdomCards)*(posX-2.5),
      y: y + (kingdomCardDescription.height+spaceBetweenKingdomCards)*(posY-2.5),
      z
    }
  }
}

export const playerBoardLocator = new PlayerBoardLocator()
