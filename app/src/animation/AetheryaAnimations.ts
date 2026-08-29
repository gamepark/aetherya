import { MaterialGameAnimations } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/aetherya/material/MaterialType'
import { isMoveItemsAtOnce, isMoveItemType } from '@gamepark/rules-api'

export const aetheryaAnimations = new MaterialGameAnimations()

aetheryaAnimations
  .configure((move) => isMoveItemType(MaterialType.KingdomCard)(move))
  .duration(600)

aetheryaAnimations
  .configure((move) => isMoveItemType(MaterialType.LegendCard)(move))
  .duration(600)

aetheryaAnimations
  .configure(isMoveItemsAtOnce)
  .skip()
