/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { PlayerId } from '@gamepark/aetherya/PlayerId'
import { PlayerPanel, usePlayers, useRules } from '@gamepark/react-game'
import { AetheryaRules } from '@gamepark/aetherya/AetheryaRules'
import { FC } from 'react'
import { createPortal } from 'react-dom'
import { Corner, tableDesign } from '../locators/position/TableDesign'

export const PlayerPanels: FC<any> = () => {
  const players = usePlayers({ sortFromMe: true })
  const nbPlayers=players.length
  const root = document.getElementById('root')
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player, index) => {
        const corner=tableDesign.playerCorner(index, nbPlayers)
        return <PlayerPanel key={player.id} playerId={player.id} color={playerColorCode[player.id]} css={panelPosition(corner)}>
          <Score player={player.id}/>
        </PlayerPanel>
      }
      )}
    </>,
    root
  )
}

const Score: FC<any> = (props) => {
  const { player } = props
  const rules = useRules<AetheryaRules>()!

  if (!rules?.isOver()) return <></>
  const score=rules.getScore(player)

  return <div><span css={vpText(score)}>{score}</span></div>
}

const panelPosition = (corner: Corner) => {
  if (corner==Corner.BottomLeft)
    return css`
    position: absolute;
    left: 1em;
    bottom: 2em;
    width: 28em;
    height: 14em;
    `
  if (corner==Corner.TopLeft)
    return css`
    position: absolute;
    left: 1em;
    top: 16em;
    width: 28em;
    height: 14em;
    `
  if (corner==Corner.MiddleTopLeft)
    return css`
    position: absolute;
    left: 1em;
    top: 35em;
    width: 28em;
    height: 14em;
    `
  if (corner==Corner.TopRight)
    return css`
    position: absolute;
    right: 1em;
    top: 16em;
    width: 28em;
    height: 14em;
    `
  if (corner==Corner.MiddleTopRight)
    return css`
    position: absolute;
    right: 1em;
    top: 35em;
    width: 28em;
    height: 14em;
    `
  // BottomRight
  return css`
  position: absolute;
  right: 1em;
  bottom: 2em;
  width: 28em;
  height: 14em;
  `
}

const vpText = (score = 0) => css`
  font-size: ${score < 100 ? 3 : 2.4}em;
  position: absolute;
  left: 50%;
  top: 60%;
  transform: translate(-50%, -50%);
  font-weight: bold;
`

export const playerColorCode: Record<PlayerId, string> = {
  1: 'blue',
  2: 'green',
  3: 'yellow',
  4: 'red'
}
