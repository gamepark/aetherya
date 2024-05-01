/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/aetherya/material/LocationType'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { legendaryCardDescription } from '../../material/LegendaryCardDescription'
import { tableDesign } from '../position/TableDesign'

export class LegendaryLineDescription extends LocationDescription {
  height = legendaryCardDescription.height
  width = legendaryCardDescription.width
  borderRadius = legendaryCardDescription.borderRadius

  alwaysVisible = true
  extraCss = css`border: 0.05em solid white`

  getLocations(_context: MaterialContext) : Location[]  {
    const locations : Location[] = []
    for (let i=1; i<=8; i++){
      locations.push({
        type: LocationType.LegendaryLine,
        x: i
      })
    }
    return locations
  }

  getCoordinates(location: Location, context: LocationContext) {
    const baseCoordinates = this.getRegionCoordinates(location, context)
    const posX=(location.x!-1) % 4
    const posY=(location.x!-1-posX) / 4
    return {
      x: baseCoordinates.x + (legendaryCardDescription.width+0.5)*(posX-1.5),
      y: baseCoordinates.y + (legendaryCardDescription.height+0.5)*(posY-1.5),
      z: 0
    }
  }

  getRegionCoordinates(location: Location, context: LocationContext) {
    return tableDesign.commonLegendaryLineCoordinates(location, context)
  }}
