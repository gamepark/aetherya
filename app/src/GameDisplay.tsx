/** @jsxImportSource @emotion/react */
//import { css } from '@emotion/react'
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
               margin={{ top: 7, left: 0, right: 0, bottom: 0 }}>
      <GameTableNavigation/>
      <PlayerPanels players={players}/>
    </GameTable>
  </>
}
