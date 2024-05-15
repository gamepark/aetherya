/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/aetherya/material/LocationType'
import { MaterialType } from '@gamepark/aetherya/material/MaterialType'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import equal from 'fast-deep-equal'
import { kingdomCardDescription } from '../../material/KingdomCardDescription'
import { tableDesign } from '../position/TableDesign'

export class PlayerBoardDescription extends LocationDescription {
  height = kingdomCardDescription.height
  width = kingdomCardDescription.width
  borderRadius = kingdomCardDescription.borderRadius

  alwaysVisible = true

  getExtraCss(location: Location, context: LocationContext) {
    const { rules } = context
//    console.log(rules.material(MaterialType.KingdomCard).location((l) => equal(l, location)))
    const cardOnLocation = rules.material(MaterialType.KingdomCard).location((l) => {
      const { rotation, ...rest } = l
      return equal(rest, location)
    }).length > 0

    if (!cardOnLocation) {
      return css`
        border: 0.05em solid white;
        pointer-events: none;
      `
    }

    return css`pointer-events: none`
  }

  getLocations(context: MaterialContext): Location[] {
    const { rules } = context
    const locations: Location[] = []

    rules.players.forEach(p => {
      for (let i = 1; i <= 4; i++) {
        for (let j = 1; j <= 4; j++) {
          locations.push({
            type: LocationType.PlayerBoard,
            player: p,
            x: i,
            y: j
          })
        }
      }
    })
    return locations
  }

  getCoordinates(location: Location, context: LocationContext): Coordinates {
    const baseCoordinates = this.getPlayerBoardCoordinates(location, context)
    return {
      x: baseCoordinates.x + (kingdomCardDescription.width + 0.5) * ((location.x! - 2.5)),
      y: baseCoordinates.y + (kingdomCardDescription.height + 0.5) * ((location.y! - 2.5)),
      z: 1
    }
  }

  getPlayerBoardCoordinates(location: Location, context: LocationContext) {
    return tableDesign.playerBoardCoordinates(location, context)
  }
}
