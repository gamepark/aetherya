/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialHelpProps, Picture } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

import dwarfIcon from '../../images/icon/dwarf2.png'
import elfIcon from '../../images/icon/elf2.png'
import goblinIcon from '../../images/icon/goblin2.png'
import humanIcon from '../../images/icon/human2.png'
import dragon3Icon from '../../images/icon/dragon3_2.png'
import legendIcon from '../../images/icon/points2.png'
import conflictIcon from '../../images/icon/conflicts2.png'

export const ScoreSheetHelp = (_props: MaterialHelpProps) => {
  const { t } = useTranslation()

  return <>
    <h2>{t('help.scoresheet')}</h2>
    <Picture src={elfIcon}/>Points for elves<br/>
    <Picture src={dwarfIcon}/>Points for dwarfs<br/>
    <Picture src={humanIcon}/>Points for humans<br/>
    <Picture src={goblinIcon}/>Points for goblins<br/>
    <Picture src={dragon3Icon}/>Points for dragons<br/>
    <Picture src={legendIcon}/>Points for legends<br/>
    <Picture src={conflictIcon}/>Points for conflicts<br/>
    &nbsp;<br/>
    = Total
    </>
}
export const alignIcon = css`
  > * {
    vertical-align: middle;
  }

  picture, img {
    vertical-align: middle;
    height: 1.5em;
    margin-right: 0.1em;
  }
`
