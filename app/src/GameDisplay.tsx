/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { GameTable, GameTableNavigation /*, usePlayers*/ } from '@gamepark/react-game'
import { FC } from 'react'
import { tableDesign } from './locators/position/TableDesign'
import { PlayerPanels } from './panels/PlayerPanels'

type GameDisplayProps = {
  players: number[]
}

export const GameDisplay: FC<GameDisplayProps> = ({players}) => {
  if (!players.length) return null;
  const tableSize = tableDesign.getTableSize(players.length)
  return <>
    <GameTable { ...tableSize }
               verticalCenter
               //css={css`background-color: rgba(255, 255, 255, 0.4)`}
               margin={{ top: 7, left: 30, right: 30, bottom: 0 }}>
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
