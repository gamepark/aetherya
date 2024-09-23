/** @jsxImportSource @emotion/react */
import { getRelativePlayerIndex, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { playerBoardLocator } from './PlayerBoardLocator'

class PlayerLegendLineLocator extends ListLocator {

  getGap(_: Location, { rules: { players } }: MaterialContext) {
    if (players.length < 3) {
      return { x: 0.5, y: 2.05 }
    } else {
      return { x: 2.05, y: 0.5 }
    }
  }

  maxCount = 12

  getCoordinates(location: Location, context: MaterialContext) {
    const { x = 0, y = 0 } = playerBoardLocator.getCoordinates(location, context)
    const index = getRelativePlayerIndex(context, location.player)
    switch (context.rules.players.length) {
      case 1:
        return {
          x: x - 25,
          y: y - playerBoardLocator.gapY * 1.5
        }
      case 2:
        return {
          x: index === 0 ? x - 25 : x + 20,
          y: y - playerBoardLocator.gapY * 1.5
        }
      case 3:
        return {
          x: x - playerBoardLocator.gapX * 1.5 + (index === 1 ? 30 : -35),
          y: index === 2 ? y - 3.5 : y + 1.5
        }
      case 4:
      default:
        return {
          x: x - playerBoardLocator.gapX * 1.5 + ((index === 1 || index === 2) ? 30 : -35),
          y: index < 2 ? y + 3.5 : y - 8.5
        }
    }
  }
}

export const playerLegendLineLocator = new PlayerLegendLineLocator()
