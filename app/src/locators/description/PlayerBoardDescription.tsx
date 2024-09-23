/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { DropAreaDescription, LocationContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { kingdomCardDescription } from '../../material/KingdomCardDescription'

export class PlayerBoardDescription extends DropAreaDescription {
  constructor() {
    super(kingdomCardDescription)
  }

  getExtraCss(_: Location, { canDrop }: LocationContext) {
    if (canDrop) return
    return css`
      border: 0.1em solid white;
    `
  }
}
