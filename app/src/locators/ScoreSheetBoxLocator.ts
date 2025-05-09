import { MaterialType } from '@gamepark/aetherya/material/MaterialType'
import { Locator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { ScoreSheetBoxDescription } from './description/ScoreSheetBoxDescription'

class ScoreSheetBoxLocator extends Locator {
  locationDescription = new ScoreSheetBoxDescription()
  parentItemType = MaterialType.ScoreSheet

  getPositionOnParent(location: Location) {
    return { x: 29 + (location.x! - 1) * 18, y: 10 + location.y! * 10 }
  }
}

export const scoreSheetBoxLocator = new ScoreSheetBoxLocator()
