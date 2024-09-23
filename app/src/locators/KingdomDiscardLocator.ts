/** @jsxImportSource @emotion/react */
import { DeckLocator, ItemContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { kingdomDeckLocator } from './KingdomDeckLocator'

class KingdomDiscardLocator extends DeckLocator {

  getCoordinates(location: Location, context: ItemContext) {
    const { x = 0 } = kingdomDeckLocator.getCoordinates(location, context)
    return { x: x + 10 }
  }

  navigationSorts = []
}

export const kingdomDiscardLocator = new KingdomDiscardLocator()
