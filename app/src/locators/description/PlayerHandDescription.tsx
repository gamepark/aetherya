/** @jsxImportSource @emotion/react */
//import { css } from '@emotion/react'
import { LocationType } from '@gamepark/aetherya/material/LocationType'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { legendCardDescription } from '../../material/LegendCardDescription'
import { tableDesign } from '../position/TableDesign'

export class PlayerHandDescription extends LocationDescription {
  height = legendCardDescription.height
  width = legendCardDescription.width
  borderRadius = legendCardDescription.borderRadius

  getLocations(context: MaterialContext) : Location[]  {
    const { rules } = context
    const locations : Location[] = []

    rules.players.forEach(p => {
      for (let i=1; i<=4; i++){
        locations.push({
          type: LocationType.PlayerHand,
          player: p,
          x: i
        })
      }
    })
    return locations
  }

  getCoordinates(location: Location, context: LocationContext) {
    const baseCoordinates = this.getRegionCoordinates(location, context)
    let posX=location.x!
    let deltaX=1.6
    if (tableDesign.isBoardRotated(location, context)){
      posX=3-posX
      deltaX=2
    }
    return {
      x: baseCoordinates.x + (legendCardDescription.width+0.5)*(posX-deltaX),
      y: baseCoordinates.y - 0.5,
      z: 2
    }
  }

  getRegionCoordinates(location: Location, context: LocationContext) {
    return tableDesign.playerHandCoordinates(location, context)
  }
}
