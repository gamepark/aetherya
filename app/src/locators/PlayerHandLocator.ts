/** @jsxImportSource @emotion/react */
// import { LocationType } from '@gamepark/aetherya/material/LocationType'
// import { MaterialType } from '@gamepark/aetherya/material/MaterialType'
import { HandLocator, ItemContext } from '@gamepark/react-game'
//import { Location, MaterialItem } from '@gamepark/rules-api'
import { Location } from '@gamepark/rules-api'
import { PlayerHandDescription } from './description/PlayerHandDescription'

export class PlayerHandLocator extends HandLocator {
  locationDescription = new PlayerHandDescription()

  isClockwise() {
    return false
  }

  getCoordinates(location: Location, context: ItemContext) {
    return { ...this.locationDescription.getCoordinates(location, context), z: 1 }
  }
/*
  getRadius(item: MaterialItem, { player }: ItemContext): number {
    return item.location.player === player ? 125 : 40
  }
*/
/*
  getBaseAngle(item: MaterialItem, { rules, player }: ItemContext): number {
    const index = getBoardIndex(item.location, rules, player)
    return [1, 2, 3].includes(index) ? 180 : 0
  }
*/
/*
  getItemIndex(item: MaterialItem, context: ItemContext): number {
    const { player, rules, index } = context
    if (item.location.player === player) {
      const hand = rules.material(MaterialType.Player).location(LocationType.PlayerHand)
      const coins = hand.player(player)
      const sorted = orderBy(coins.getIndexes(), (index) => -getValue(hand.getItem(index)!.id))
      return sorted.indexOf(index)
    } else {
      return item.location.x!
    }
  }
*/
}

export const playerHandLocator = new PlayerHandLocator()
