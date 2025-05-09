/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'
import { useTranslation } from 'react-i18next'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AetheryaRules } from '@gamepark/aetherya/AetheryaRules'
import { PlayerId } from '@gamepark/aetherya/PlayerId'
import { Avatar, PlayerTimer, SpeechBubbleDirection, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { FC, HTMLAttributes } from 'react'
import Player1 from '../images/KingdomMountain.jpg'
import Player2 from '../images/KingdomForest.jpg'
import Player3 from '../images/KingdomPlain.jpg'
import Player4 from '../images/Volcan.png'

import { Memory } from '@gamepark/aetherya/rules/Memory'

type AetheryaPlayerPanelProps = {
  playerId: PlayerId
} & HTMLAttributes<HTMLDivElement>

export const AetheryaPlayerPanel: FC<AetheryaPlayerPanelProps> = (props) => {
  const { playerId, ...rest } = props
  const { t } = useTranslation()
  const rules = useRules<AetheryaRules>()!
  let playerName = usePlayerName(playerId)

  // Tweak names for the tutorial
  const me = usePlayerId()
  const itsMe = me && playerId === me
  const isTutorial = !rules || rules.game.tutorial !== undefined
  if (isTutorial && !itsMe){
    playerName=t('tuto.opponent')
  }

  return (
    <>
      <div css={[panelPlayerStyle, panelStyle(playerId)]} {...rest}>
        <Avatar css={avatarStyle} playerId={playerId} speechBubbleProps={{ direction: SpeechBubbleDirection.BOTTOM_LEFT }}/>
        <h2 css={[nameStyle, data]}>{playerName}</h2>
        <Timer {...props} />
        <Score {...props} />
      </div>

    </>
  )
}

const Timer: FC<AetheryaPlayerPanelProps> = (props) => {
  const { playerId } = props
  const rules = useRules<AetheryaRules>()!

  if (rules?.isOver()) return null

  return <PlayerTimer customStyle={[(playing) => !playing && css`color: lightgray !important;`]} playerId={playerId} css={[timerStyle, data]}/>
}

const Score: FC<AetheryaPlayerPanelProps> = (props => {
  const { playerId } = props
  const rules = useRules<AetheryaRules>()!

  const realTimeScore:boolean=rules.remind(Memory.RealTimeScore)
  const gameIsOver=rules?.isOver()
  if (!realTimeScore && !gameIsOver) return <></>
  const score=rules.getScore(playerId)

  return (
    <span css={[placedCard, data]}>
      <FontAwesomeIcon icon={faStar} css={scoreStyle} fill="#28B8CE"/>
      <span>{score}</span>
    </span>
  )
})

const placedCard = css`
  position: absolute;
  width: 3.5em;
  font-size: 2.5em;
  bottom: 0.2em;
  left: initial;
  right: 0.25em;
  display: flex;
  height: 1.35em;

  > span {
    text-align: right;
    width: 1.7em;
  }
`

const scoreStyle = css`
  color: #28B8CE
`

const panelPlayerStyle = css`
  color: black;
  border-radius: 3em 1.5em 1.5em 1.5em;
  box-shadow: 0 0 0.5em black, 0 0 0.5em black;
`

const avatarStyle = css`
  position: absolute;
  top: -0.1em;
  left: 0;
  border-radius: 100%;
  height: 6em;
  width: 6em;
  color: black;
  z-index: 1;
`
const nameStyle = css`
  position: absolute;
  top: 0.3em;
  left: initial;
  right: 0.3em;
  max-width: 7.3em;
  font-size: 2.4em;
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const PlayerBackground = [
  Player1,
  Player2,
  Player3,
  Player4,
]

const ImageDelta = [
  "-9em -13em",
  "-9em -5em",
  "-9em -20em",
  "-9em -14em",
]

const panelStyle = (playerId: PlayerId) => css`
  cursor: pointer;

  background: rgba(0, 0, 0, 0.8) url(${PlayerBackground[playerId - 1]}) no-repeat ${ImageDelta[playerId - 1]};
  background-size: 150% auto;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    left: 0;
    border-radius: 1em;
    //background-color: rgba(255, 255, 255, 0.3);
  }
`

const data = css`
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 0.1em 0.3em;
  border-radius: 0.4em;
  z-index: 2;
`

const timerStyle = css`
  position: absolute;
  bottom: 0.2em;
  left: initial;
  right: 4.1em;
  font-size: 2.5em;
`
