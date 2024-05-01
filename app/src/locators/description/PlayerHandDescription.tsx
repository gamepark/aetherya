/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/aetherya/material/LocationType'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { legendaryCardDescription } from '../../material/LegendaryCardDescription'
import { tableDesign } from '../position/TableDesign'

export class PlayerHandDescription extends LocationDescription {
  height = legendaryCardDescription.height + 0.8
  width = legendaryCardDescription.width*4 + 0.8
  borderRadius = legendaryCardDescription.borderRadius

  alwaysVisible = true
  extraCss = css`border: 0.05em solid white`

  getLocations(context: MaterialContext): Location[] {
    const { rules } = context
    const locations : Location[] = []

    rules.players.forEach(p => {
      locations.push({
        type: LocationType.PlayerHand,
        player: p
      })
    })
    return locations
  }

  getCoordinates(location: Location, context: LocationContext) {
    return this.getRegionCoordinates(location, context)
  }

  getRegionCoordinates(location: Location, context: LocationContext) {
    return tableDesign.playerHandCoordinates(location, context)
  }
}
