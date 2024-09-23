/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { getRelativePlayerIndex, useMaterialContext } from '@gamepark/react-game'
import { FC } from 'react'
import { createPortal } from 'react-dom'
import { AetheryaPlayerPanel } from './AetheryaPlayerPanel'

export const PlayerPanels: FC<{ players: number[] }> = ({ players }) => {
  const context = useMaterialContext()
  const nbPlayers = players.length
  const root = document.getElementById('root')
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player) => {
          const relativeIndex = getRelativePlayerIndex(context, player)
          const corner = playerCorner(relativeIndex, nbPlayers)
          return <AetheryaPlayerPanel key={player} playerId={player} css={panelPosition(corner)}/>
        }
      )}
    </>,
    root
  )
}

enum Corner {
  TopLeft = 1,
  TopRight = 2,
  MiddleTopLeft = 3,
  MiddleTopRight = 4,
  BottomLeft = 5,
  BottomRight = 6
}

function playerCorner(position: number, players: number): Corner {
  switch (players) {
    case 1:
      return Corner.TopRight
    case 2:
      return position === 0 ? Corner.TopLeft : Corner.TopRight
    case 3:
      switch (position) {
        case 0:
          return Corner.TopLeft
        case 1:
          return Corner.TopRight
        case 2:
        default:
          return Corner.BottomLeft
      }
    case 4:
    default:
      switch (position) {
        case 0:
          return Corner.TopLeft
        case 1:
          return Corner.TopRight
        case 2:
          return Corner.BottomRight
        case 3:
        default:
          return Corner.BottomLeft
      }
  }
}

const panelPosition = (corner: Corner) => {
  if (corner === Corner.BottomLeft)
    return css`
      position: absolute;
      left: 1em;
      bottom: 2em;
      width: 28em;
      height: 9em;
    `
  if (corner === Corner.TopLeft)
    return css`
      position: absolute;
      left: 1em;
      top: 9em;
      width: 28em;
      height: 9em;
    `
  if (corner === Corner.MiddleTopLeft)
    return css`
      position: absolute;
      left: 1em;
      top: 35em;
      width: 28em;
      height: 9em;
    `
  if (corner === Corner.TopRight)
    return css`
      position: absolute;
      right: 1em;
      top: 9em;
      width: 28em;
      height: 9em;
    `
  if (corner === Corner.MiddleTopRight)
    return css`
      position: absolute;
      right: 1em;
      top: 35em;
      width: 28em;
      height: 9em;
    `
  // BottomRight
  return css`
    position: absolute;
    right: 1em;
    bottom: 2em;
    width: 28em;
    height: 9em;
  `
}
