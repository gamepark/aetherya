import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class LegendDeckLocator extends DeckLocator {
  getCoordinates(_: Location, { rules: { players } }: MaterialContext) {
    switch (players.length) {
      case 1:
        return { x: -5, y: -25 }
      case 2:
        return { x: -20, y: -25 }
      case 3:
        return { x: 5, y: 0 }
      default:
        return { x: 5 }
    }
  }
}

export const legendDeckLocator = new LegendDeckLocator()
