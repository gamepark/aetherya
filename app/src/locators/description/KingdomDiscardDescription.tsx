/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/aetherya/material/LocationType'
//import { MaterialType } from '@gamepark/aetherya/material/MaterialType'
import { LocationContext, LocationDescription /*, MaterialContext*/ } from '@gamepark/react-game'
import { /*isSelectItemType,*/ Location /*, MaterialMove*/ } from '@gamepark/rules-api'
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
      z: -1
    }
  }

/*
  canShortClick(move: MaterialMove, _location: Location, context: MaterialContext): boolean {
    if (isSelectItemType(MaterialType.KingdomCard)(move)) {
      const item = context.rules.material(MaterialType.KingdomCard).getItem(move.itemIndex)!
      if (item.location.type === LocationType.KingdomDiscard) return true
    }
    return false
  }
*/
}
