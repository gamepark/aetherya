/** @jsxImportSource @emotion/react */
import { ItemLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { PlayerLegendaryLineDescription } from './description/PlayerLegendaryLineDescription'
//import { legendaryCardDescription } from '../material/LegendaryCardDescription'

export class PlayerLegendaryLineLocator extends ItemLocator {
  locationDescription = new PlayerLegendaryLineDescription()

  getPosition(item: MaterialItem, context: ItemContext) {
/*
    const zoneCenter = this.locationDescription.getCoordinates(item.location, context)
    console.log("context")
    console.log(context)
    return {
      x:zoneCenter.x - (this.locationDescription.width/2) + (legendaryCardDescription.width/2),
      y:zoneCenter.y - (this.locationDescription.height/2) + (legendaryCardDescription.height/2),
      z:0.05
    }
  }
*/
/*
    return {
      ...this.locationDescription.getCoordinates(item.location, context),
      z:0.05
    }
*/
    return this.locationDescription.getCoordinates(item.location, context)
  }
}

export const playerLegendaryLineLocator = new PlayerLegendaryLineLocator()
