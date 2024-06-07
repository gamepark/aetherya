/** @jsxImportSource @emotion/react */
//import { css } from '@emotion/react'
import { LocationType } from '@gamepark/aetherya/material/LocationType'
import { MaterialType } from '@gamepark/aetherya/material/MaterialType'
import { ComponentSize, LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { legendCardDescription } from '../../material/LegendCardDescription'
import { tableDesign } from '../position/TableDesign'

export class PlayerLegendLineDescription extends LocationDescription {
  borderRadius = legendCardDescription.borderRadius

  alwaysVisible = true
  //extraCss = css`border: 0.05em solid white`

  location = { type: LocationType.PlayerLegendLine }

  getSize(_location: Location, context: MaterialContext): ComponentSize {
    let width=0
    let height=0
    const horizontalLine=tableDesign.isPlayerLegendLineHorizontal(context)
    if (horizontalLine){
      height = legendCardDescription.height+0.5*12+2
      width = legendCardDescription.width+2*12+2
    } else {
      height = legendCardDescription.height+2*12
      width = legendCardDescription.width+0.5*12
    }
    return { width, height }
  }

  getLocations(context: MaterialContext): Location[] {
    if (!context.player) return []
    return [{ type: LocationType.PlayerLegendLine, player: context.player }]
  }

  getCoordinates(location: Location, context: LocationContext) {
    const baseCoordinates = tableDesign.playerLegendLineCoordinates(location, context)
    if (location.x===undefined){
      return { x:baseCoordinates.x+2, y:baseCoordinates.y, z:0 }
    }
    const x = location.x ?? context.rules.material(MaterialType.LegendCard).player(location.player).length
    const horizontalLine=tableDesign.isPlayerLegendLineHorizontal(context)

    if (horizontalLine){
      // Horizontal player legend line
      return {
        x: baseCoordinates.x + (legendCardDescription.width * -1.5) + x * 2,
        y: baseCoordinates.y + x * 0.5 - (legendCardDescription.height/2),
        z: x + 1
      }
    }

    // Vertical player legend line
    return {
      x: baseCoordinates.x + x * 0.5,
      y: baseCoordinates.y + (legendCardDescription.height * -1.5 - 0.5) + x * 2,
      z: x + 1
    }
  }
}
