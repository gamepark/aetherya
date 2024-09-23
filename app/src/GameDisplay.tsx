/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { GameTable, GameTableNavigation } from '@gamepark/react-game'
import { FC } from 'react'
import { PlayerPanels } from './panels/PlayerPanels'

type GameDisplayProps = {
  players: number[]
}

export const GameDisplay: FC<GameDisplayProps> = ({ players }) => {
  const tableSize = getTableSize(players.length)
  return <>
    <GameTable {...tableSize}
               verticalCenter
               margin={{ top: 7, left: 0, right: 0, bottom: 0 }}
               css={process.env.NODE_ENV === 'development' && css`border: 1px solid white;`}>
      <GameTableNavigation css={navigation}/>
      <PlayerPanels players={players}/>
    </GameTable>
  </>
}

const navigation = css`
  flex-direction: column;
  top: 45em;
  right: 2em;
  left: initial;
`

function getTableSize(players: number) {
  switch (players) {
    case 1:
      return { xMin: -56, xMax: 12, yMin: -34, yMax: 17 }
    case 2:
      return { xMin: -55, xMax: 57, yMin: -35, yMax: 18 }
    case 3:
      return { xMin: -77, xMax: 79, yMin: -37, yMax: 37 }
    case 4:
    default:
      return { xMin: -66, xMax: 68, yMin: -42, yMax: 42 }
  }
}