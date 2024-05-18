/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { LegendCard } from '@gamepark/aetherya/material/LegendCard'
import { MaterialHelpProps, Picture } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'
import legendIcon from '../../images/icon/points2.png'

export const LegendCardHelp = (props: MaterialHelpProps) => {
  const { item } = props
  const { t } = useTranslation()

  if (item.id === undefined) {
    return <>
      <h2>{t('help.legend-card')}</h2>
    </>
  } else if (item.id === LegendCard.LinkedHumanElf) {
    return <>
      <h2>{t('help.linked-human-elf')}</h2>
      <Picture src={legendIcon}/>{t('help.2points')}<br/>
      &nbsp;<br/>
      {t('help.condition')}:<br/>
      <ul>
        <li>{t('help.linkedHumanElfCondition')}</li>
      </ul>
    </>
  } else if (item.id === LegendCard.LinkedHumanDwarf) {
    return <>
      <h2>{t('help.linked-human-dwarf')}</h2>
      <Picture src={legendIcon}/>{t('help.2points')}<br/>
      &nbsp;<br/>
      {t('help.condition')}:<br/>
      <ul>
      <li>{t('help.linkedHumanDwarfCondition')}</li>
      </ul>
    </>
  } else if (item.id === LegendCard.TwoLinkedGoblins) {
    return <>
      <h2>{t('help.linked-goblins')}</h2>
      <Picture src={legendIcon}/>{t('help.2points')}<br/>
      &nbsp;<br/>
      {t('help.condition')}:<br/>
      <ul>
        <li>{t('help.2linkedGoblinsCondition')}</li>
      </ul>
    </>
  } else if (item.id === LegendCard.TwoLinkedHumans) {
    return <>
      <h2>{t('help.linked-humans')}</h2>
      <Picture src={legendIcon}/>{t('help.2points')}<br/>
      &nbsp;<br/>
      {t('help.condition')}:<br/>
      <ul>
        <li>{t('help.2linkedHumansCondition')}</li>
      </ul>
    </>
  } else if (item.id === LegendCard.TwoLinkedElves) {
    return <>
      <h2>{t('help.linked-elves')}</h2>
      <Picture src={legendIcon}/>{t('help.2points')}<br/>
      &nbsp;<br/>
      {t('help.condition')}:<br/>
      <ul>
        <li>{t('help.2linkedElvesCondition')}</li>
      </ul>
    </>
  } else if (item.id === LegendCard.TwoLinkedDwarfs) {
    return <>
      <h2>{t('help.linked-dwarfs')}</h2>
      <Picture src={legendIcon}/>{t('help.2points')}<br/>
      &nbsp;<br/>
      {t('help.condition')}:<br/>
      <ul>
        <li>{t('help.2linkedDwarfsCondition')}</li>
      </ul>
    </>
  } else if (item.id === LegendCard.FourTribes) {
    return <>
      <h2>{t('help.all-tribes')}</h2>
      <Picture src={legendIcon}/>{t('help.4points')}<br/>
      &nbsp;<br/>
      {t('help.condition')}:<br/>
      <ul>
        <li>{t('help.allTribes.1')}</li>
        <li>{t('help.allTribes.2')}</li>
      </ul>
    </>
  } else if (item.id === LegendCard.TwoVsOne_GoblinHuman) {
    return <>
      <h2>{t('help.2vs1.goblin-human')}</h2>
      <Picture src={legendIcon}/>{t('help.3points')}<br/>
      &nbsp;<br/>
      {t('help.condition')}:<br/>
      <ul>
        <li>{t('help.2vs1.goblin-human.1')}</li>
        <li>{t('help.2vs1.goblin-human.2')}</li>
      </ul>
    </>
  } else if (item.id === LegendCard.TwoVsOne_GoblinElf) {
    return <>
      <h2>{t('help.2vs1.goblin-elf')}</h2>
      <Picture src={legendIcon}/>{t('help.3points')}<br/>
      &nbsp;<br/>
      {t('help.condition')}:<br/>
      <ul>
        <li>{t('help.2vs1.goblin-elf.1')}</li>
        <li>{t('help.2vs1.goblin-elf.2')}</li>
      </ul>
    </>
  } else if (item.id === LegendCard.TwoVsOne_GoblinDwarf) {
    return <>
      <h2>{t('help.2vs1.goblin-dwarf')}</h2>
      <Picture src={legendIcon}/>{t('help.3points')}<br/>
      &nbsp;<br/>
      {t('help.condition')}:<br/>
      <ul>
        <li>{t('help.2vs1.goblin-dwarf.1')}</li>
        <li>{t('help.2vs1.goblin-dwarf.2')}</li>
      </ul>
    </>
  } else if (item.id === LegendCard.TwoVsOne_ElfDwarf) {
    return <>
      <h2>{t('help.2vs1.elf-dwarf')}</h2>
      <Picture src={legendIcon}/>{t('help.3points')}<br/>
      &nbsp;<br/>
      {t('help.condition')}:<br/>
      <ul>
        <li>{t('help.2vs1.elf-dwarf.1')}</li>
        <li>{t('help.2vs1.elf-dwarf.2')}</li>
      </ul>
    </>
  } else if (item.id === LegendCard.ThreeLinkedPlains) {
    return <>
      <h2>{t('help.linked-plains')}</h2>
      <Picture src={legendIcon}/>{t('help.4points')}<br/>
      &nbsp;<br/>
      {t('help.condition')}:<br/>
      <ul>
        <li>{t('help.linked-plains.1')}</li>
      </ul>
    </>
  } else if (item.id === LegendCard.ThreeLinkedSwamps) {
    return <>
      <h2>{t('help.linked-swamps')}</h2>
      <Picture src={legendIcon}/>{t('help.4points')}<br/>
      &nbsp;<br/>
      {t('help.condition')}:<br/>
      <ul>
        <li>{t('help.linked-swamps.1')}</li>
      </ul>
    </>
  } else if (item.id === LegendCard.ThreeLinkedMountains) {
    return <>
      <h2>{t('help.linked-mountains')}</h2>
      <Picture src={legendIcon}/>{t('help.4points')}<br/>
      &nbsp;<br/>
      {t('help.condition')}:<br/>
      <ul>
        <li>{t('help.linked-mountains.1')}</li>
        <li>3 mountains are adjacent</li>
      </ul>
    </>
  } else if (item.id === LegendCard.ThreeLinkedForests) {
    return <>
      <h2>{t('help.linked-forests')}</h2>
      <Picture src={legendIcon}/>{t('help.4points')}<br/>
      &nbsp;<br/>
      {t('help.condition')}:<br/>
      <ul>
        <li>{t('help.linked-forests.1')}</li>
      </ul>
    </>
  }

  return <>*** Missing description ***</>
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
