import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class ScoreSheetLocator extends Locator {
  getCoordinates(_: Location, { rules: { players } }: MaterialContext) {
    switch (players.length) {
      case 1:
        return { x: 5, y: -25 }
      case 2:
        return { x: 25, y: -25 }
      case 3:
        return { y: -27 }
      case 4:
      default:
        return { x: -42 }
    }
  }
}

export const scoreSheetLocator = new ScoreSheetLocator()
