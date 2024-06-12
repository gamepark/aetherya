/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { tr } from '../../Translator'
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
  const { i18n, t } = useTranslation()
  const lang=i18n.language

  return <>
    <h2>{tr(t, lang, 'help.scoresheet')}</h2>
    <Picture src={elfIcon}/>{tr(t, lang, 'help.elfPoints')}<br/>
    <Picture src={dwarfIcon}/>{tr(t, lang, 'help.dwarfPoints')}<br/>
    <Picture src={humanIcon}/>{tr(t, lang, 'help.humanPoints')}<br/>
    <Picture src={goblinIcon}/>{tr(t, lang, 'help.goblinPoints')}<br/>
    <Picture src={dragon3Icon}/>{tr(t, lang, 'help.dragonPoints')}<br/>
    <Picture src={legendIcon}/>{tr(t, lang, 'help.legendPoints')}<br/>
    <Picture src={conflictIcon}/>{tr(t, lang, 'help.conflictPoints')}<br/>
    &nbsp;<br/>
    = {tr(t, lang, 'help.totalPoints')}
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
