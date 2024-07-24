import { MaterialGameAnimations } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/aetherya/material/MaterialType'
import { isMoveItemsAtOnce, isMoveItemType } from '@gamepark/rules-api'

export const aetheryaAnimations = new MaterialGameAnimations()

aetheryaAnimations.when()
  .move((move) => isMoveItemType(MaterialType.KingdomCard)(move))
  .duration(0.6)

aetheryaAnimations.when()
  .move((move) => isMoveItemType(MaterialType.LegendCard)(move))
  .duration(0.6)

aetheryaAnimations.when()
  .move(isMoveItemsAtOnce)
  .none()
