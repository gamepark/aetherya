/** @jsxImportSource @emotion/react */
//import { css } from '@emotion/react'
import { LocationType } from '@gamepark/aetherya/material/LocationType'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { legendCardDescription } from '../../material/LegendCardDescription'
import { tableDesign } from '../position/TableDesign'

export class PlayerLegendLineDescription extends LocationDescription {
  height = legendCardDescription.height
  width = legendCardDescription.width
  borderRadius = legendCardDescription.borderRadius

//  alwaysVisible = true
//  extraCss = css`border: 0.05em solid white`

  location = { type: LocationType.PlayerLegendLine }

  getLocations(context: MaterialContext) : Location[]  {
    const { rules } = context
    const locations : Location[] = []

    for (let i=1; i<=15; i++){
      rules.players.forEach(p => {
        locations.push({
          type: LocationType.PlayerLegendLine,
          player: p,
          x: i
        })
      })
    }
    return locations
  }

  getCoordinates(location: Location, context: LocationContext) {
    const baseCoordinates = tableDesign.playerLegendLineCoordinates(location, context)
    const deltaX=(location.x!-1)
    const deltaY=(location.x!-1)
    return {
      x: baseCoordinates.x + (legendCardDescription.width*0)+deltaX*0.5,
      y: baseCoordinates.y + (legendCardDescription.height*-1.5-0.5)+deltaY*2,
      z: location.x!+1
    }
  }
}
