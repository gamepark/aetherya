/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/aetherya/material/LocationType'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { legendaryCardDescription } from '../../material/LegendaryCardDescription'
import { tableDesign } from '../position/TableDesign'

export class PlayerLegendaryLineDescription extends LocationDescription {
  height = legendaryCardDescription.height + 2*11
  width = legendaryCardDescription.width + 0.5*11
  borderRadius = legendaryCardDescription.borderRadius

  alwaysVisible = true
  extraCss = css`border: 0.05em solid white`

  location = { type: LocationType.PlayerLegendaryLine }

  getLocations(context: MaterialContext) : Location[]  {
    const { rules } = context
    const locations : Location[] = []

    rules.players.forEach(p => {
      locations.push({
        type: LocationType.PlayerLegendaryLine,
        player: p
      })
    })
    return locations
  }

  getCoordinates(location: Location, context: LocationContext) {
    return tableDesign.playerLegendaryLineCoordinates(location, context)
  }

  // deckCoordinates = { x: -30, y: 30, z: 0}
}
