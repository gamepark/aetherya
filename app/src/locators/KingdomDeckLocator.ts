/** @jsxImportSource @emotion/react */
import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class KingdomDeckLocator extends DeckLocator {
  getCoordinates(_: Location, { rules: { players } }: MaterialContext) {
    return { x: players.length === 4 ? -20 : -5 }
  }

  navigationSorts = []
}

export const kingdomDeckLocator = new KingdomDeckLocator()
