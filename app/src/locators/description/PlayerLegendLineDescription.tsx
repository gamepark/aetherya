/** @jsxImportSource @emotion/react */
//import { css } from '@emotion/react'
import { LocationType } from '@gamepark/aetherya/material/LocationType'
import { MaterialType } from '@gamepark/aetherya/material/MaterialType'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { legendCardDescription } from '../../material/LegendCardDescription'
import { tableDesign } from '../position/TableDesign'

export class PlayerLegendLineDescription extends LocationDescription {
  height = legendCardDescription.height
  width = legendCardDescription.width
  borderRadius = legendCardDescription.borderRadius

  //alwaysVisible = true
  //extraCss = css`border: 0.05em solid white`

  location = { type: LocationType.PlayerLegendLine }

  getLocations(context: MaterialContext): Location[] {
    if (!context.player) return []
    return [{ type: LocationType.PlayerLegendLine, player: context.player }]
  }

  getCoordinates(location: Location, context: LocationContext) {
    const x = location.x ?? context.rules.material(MaterialType.LegendCard).player(location.player).length
    const baseCoordinates = tableDesign.playerLegendLineCoordinates(location, context)
    return {
      x: baseCoordinates.x + x * 0.5,
      y: baseCoordinates.y + (legendCardDescription.height * -1.5 - 0.5) + x * 2,
      z: x + 1
    }
  }
}
