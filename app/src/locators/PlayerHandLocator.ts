/** @jsxImportSource @emotion/react */
import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { legendCardDescription } from '../material/LegendCardDescription'
import { playerBoardLocator } from './PlayerBoardLocator'

class PlayerHandLocator extends ListLocator {

  getCoordinates(location: Location, context: MaterialContext) {
    const { x = 0, y = 0 } = playerBoardLocator.getCoordinates(location, context)
    return { x: x - 10, y: y + 12.5, z: 1 }
  }

  gap = { x: legendCardDescription.width + 0.5 }
}

export const playerHandLocator = new PlayerHandLocator()
