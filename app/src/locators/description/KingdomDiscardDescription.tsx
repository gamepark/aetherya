/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/aetherya/material/LocationType'
//import { MaterialType } from '@gamepark/aetherya/material/MaterialType'
import { LocationContext, LocationDescription } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { kingdomCardDescription } from '../../material/KingdomCardDescription'
import { tableDesign } from '../position/TableDesign'

export class KingdomDiscardDescription extends LocationDescription {
  height = kingdomCardDescription.height
  width = kingdomCardDescription.width
  borderRadius = kingdomCardDescription.borderRadius

  alwaysVisible = true
  extraCss = css`border: 0.05em solid white`

  location = { type: LocationType.KingdomDiscard }
  getCoordinates(_location: Location, context: LocationContext) {
    const baseCoordinates=tableDesign.kingdomDiscardCoordinates(context)
    return {
      x: baseCoordinates.x,
      y: baseCoordinates.y,
      z: context.canDrop ? 5 : 0
    }
  }
}
