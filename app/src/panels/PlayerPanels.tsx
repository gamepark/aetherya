/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { PlayerId } from '@gamepark/aetherya/PlayerId'
import { getRelativePlayerIndex, PlayerPanel, /*usePlayers,*/ useMaterialContext, useRules } from '@gamepark/react-game'
import { AetheryaRules } from '@gamepark/aetherya/AetheryaRules'
import { FC } from 'react'
import { createPortal } from 'react-dom'
import { Corner, tableDesign } from '../locators/position/TableDesign'
import { Memory } from '@gamepark/aetherya/rules/Memory'

export const PlayerPanels: FC<{players:number[]}> = ({players}) => {
//  const players = usePlayers({ sortFromMe: true })
  const context=useMaterialContext()
  const nbPlayers=players.length
  const root = document.getElementById('root')
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player) => {
        const relativeIndex = getRelativePlayerIndex(context, player)
        const corner=tableDesign.playerCorner(relativeIndex, nbPlayers)
        return <PlayerPanel key={player} playerId={player} color={playerColorCode[player]} css={panelPosition(corner)}>
          <Score player={player}/>
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

  const realTimeScore:boolean=rules.remind(Memory.RealTimeScore)
  const gameIsOver=rules?.isOver()
  if (!realTimeScore && !gameIsOver) return <></>
  const score=rules.getScore(player)

  return <div><span css={vpText(score, gameIsOver)}>{score}</span></div>
}

const panelPosition = (corner: Corner) => {
  if (corner===Corner.BottomLeft)
    return css`
    position: absolute;
    left: 1em;
    bottom: 2em;
    width: 28em;
    height: 14em;
    `
  if (corner===Corner.TopLeft)
    return css`
    position: absolute;
    left: 1em;
    top: 9em;
    width: 28em;
    height: 14em;
    `
  if (corner===Corner.MiddleTopLeft)
    return css`
    position: absolute;
    left: 1em;
    top: 35em;
    width: 28em;
    height: 14em;
    `
  if (corner===Corner.TopRight)
    return css`
    position: absolute;
    right: 1em;
    top: 9em;
    width: 28em;
    height: 14em;
    `
  if (corner===Corner.MiddleTopRight)
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

const vpText = (score=0, gameIsOver=false) => css`
  font-size: ${score < 100 ? 3 : 2.4}em;
  position: absolute;
  left: 50%;
  top: ${gameIsOver ? 60 : 70}%;
  transform: translate(-50%, -50%);
  font-weight: bold;
`

export const playerColorCode: Record<PlayerId, string> = {
  1: 'blue',
  2: 'green',
  3: 'yellow',
  4: 'red'
}
