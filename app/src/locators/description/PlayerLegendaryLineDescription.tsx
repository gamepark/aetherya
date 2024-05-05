/** @jsxImportSource @emotion/react */
//import { css } from '@emotion/react'
import { LocationType } from '@gamepark/aetherya/material/LocationType'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { legendaryCardDescription } from '../../material/LegendaryCardDescription'
import { tableDesign } from '../position/TableDesign'

export class PlayerLegendaryLineDescription extends LocationDescription {
  height = legendaryCardDescription.height
  width = legendaryCardDescription.width
  borderRadius = legendaryCardDescription.borderRadius

//  alwaysVisible = true
//  extraCss = css`border: 0.05em solid white`

  location = { type: LocationType.PlayerLegendaryLine }

  getLocations(context: MaterialContext) : Location[]  {
    const { rules } = context
    const locations : Location[] = []

    for (let i=1; i<=15; i++){
      rules.players.forEach(p => {
        locations.push({
          type: LocationType.PlayerLegendaryLine,
          player: p,
          x: i
        })
      })
    }
    return locations
  }

  getCoordinates(location: Location, context: LocationContext) {
    const baseCoordinates = tableDesign.playerLegendaryLineCoordinates(location, context)
    const deltaX=(location.x!-1)
    const deltaY=(location.x!-1)
    return {
      x: baseCoordinates.x + (legendaryCardDescription.width*0)+deltaX*0.5,
      y: baseCoordinates.y + (legendaryCardDescription.height*-1.5-0.5)+deltaY*2,
      z: location.x!+1
    }
  }
}
