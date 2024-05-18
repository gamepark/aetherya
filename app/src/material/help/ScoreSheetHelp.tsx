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
    <Picture src={elfIcon}/>{t('help.elfPoints')}<br/>
    <Picture src={dwarfIcon}/>{t('help.dwarfPoints')}<br/>
    <Picture src={humanIcon}/>{t('help.humanPoints')}<br/>
    <Picture src={goblinIcon}/>{t('help.goblinPoints')}<br/>
    <Picture src={dragon3Icon}/>{t('help.dragonPoints')}<br/>
    <Picture src={legendIcon}/>{t('help.legendPoints')}<br/>
    <Picture src={conflictIcon}/>{t('help.conflictPoints')}<br/>
    &nbsp;<br/>
    = {t('help.totalPoints')}
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
