/*
import { LocationType } from '@gamepark/aetherya/material/LocationType'
*/
import { MaterialGameAnimations } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/aetherya/material/MaterialType'
import { isMoveItemType /*, isShuffle */ } from '@gamepark/rules-api'

export const aetheryaAnimations = new MaterialGameAnimations()

aetheryaAnimations.when()
  .move((move) => isMoveItemType(MaterialType.KingdomCard)(move))
  .duration(0.5)

  aetheryaAnimations.when()
    .move((move) => isMoveItemType(MaterialType.LegendaryCard)(move))
    .duration(0.5)

/*
aetheryaAnimations.when()
  .move((move) => isMoveItemType(MaterialType.Region)(move) && move.location.type === LocationType.Region)
  .duration(0.5)

aetheryaAnimations.when()
  .move((move) => isMoveItemType(MaterialType.Region)(move) && move.location.type === LocationType.RegionDiscard)
  .duration(0.5)

aetheryaAnimations.when()
  .move((move) => isMoveItemType(MaterialType.Sanctuary)(move)
    && (move.location.type === LocationType.SanctuaryDeck || move.location.type === LocationType.PlayerSanctuaryHand))
  .duration(0.3)

aetheryaAnimations.when()
  .move(isShuffle)
  .none()
*/
