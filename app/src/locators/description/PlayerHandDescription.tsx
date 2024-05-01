/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/aetherya/material/LocationType'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { legendaryCardDescription } from '../../material/LegendaryCardDescription'

export class PlayerHandDescription extends LocationDescription {
  height = legendaryCardDescription.height + 0.8
  width = legendaryCardDescription.width*4 + 0.8
  borderRadius = legendaryCardDescription.borderRadius

  alwaysVisible = true
  extraCss = css`border: 0.05em solid white`

  getLocations({ player }: MaterialContext): Location[] {
    return player ? [{ type: LocationType.PlayerHand, player }] : []
  }

  getCoordinates(_location: Location, context: LocationContext) {
    const { player } = context
    const coordinates = { x: 0, y: 82 }

    const deltaX = 0 // player!*100
    const deltaY = -player!*30

    return {
      x: coordinates.x + deltaX,
      y: coordinates.y + deltaY,
      z: 0
    }
  }
}
