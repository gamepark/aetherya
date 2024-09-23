/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialType } from '@gamepark/aetherya/material/MaterialType'
import { DropAreaDescription, LocationContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { kingdomCardDescription } from '../../material/KingdomCardDescription'

export class PlayerBoardDescription extends DropAreaDescription {
  constructor() {
    super(kingdomCardDescription)
  }

  getExtraCss(location: Location, { rules }: LocationContext) {
    const cardOnLocation = rules.material(MaterialType.KingdomCard)
      .location(l => l.type === location.type && l.player === location.player && l.x === location.x && l.y === location.y)

    if (cardOnLocation.length > 0) return

    return css`
      border: 0.1em solid white;
    `
  }
}
