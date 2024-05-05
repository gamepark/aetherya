/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { LegendCard } from '@gamepark/aetherya/material/LegendCard'
import { MaterialHelpProps, Picture } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'
import legendIcon from '../../images/icon/points2.png'

export const LegendCardHelp = (props: MaterialHelpProps) => {
  const {item}=props
  const { t } = useTranslation()

  if (item.id===undefined){
    return <>
      <h2>{t('help.legend-card')}</h2>
      </>
  } else if (item.id==LegendCard.LinkedHumanElf){
    return <>
      <h2>{t('help.linked-human-elf')}</h2>
      <Picture src={legendIcon}/>2 points<br/>
      &nbsp;<br/>
      Condition:<br/>
      <ul><li>A human tribe is adjacent to an elf tribe</li></ul>
      </>
  } else if (item.id==LegendCard.LinkedHumanDwarf){
    return <>
      <h2>{t('help.linked-human-dwarf')}</h2>
      <Picture src={legendIcon}/>2 points<br/>
      &nbsp;<br/>
      Condition:<br/>
      <ul><li>A human tribe is adjacent to a dwarf tribe</li></ul>
      </>
  } else if (item.id==LegendCard.TwoLinkedGoblins){
    return <>
      <h2>{t('help.linked-goblins')}</h2>
      <Picture src={legendIcon}/>2 points<br/>
      &nbsp;<br/>
      Condition:<br/>
      <ul><li>2 goblin tribes are adjacent</li></ul>
      </>
  } else if (item.id==LegendCard.TwoLinkedHumans){
    return <>
      <h2>{t('help.linked-humans')}</h2>
      <Picture src={legendIcon}/>2 points<br/>
      &nbsp;<br/>
      Condition:<br/>
      <ul><li>2 human tribes are adjacent</li></ul>
      </>
  } else if (item.id==LegendCard.TwoLinkedElves){
    return <>
      <h2>{t('help.linked-elves')}</h2>
      <Picture src={legendIcon}/>2 points<br/>
      &nbsp;<br/>
      Condition:<br/>
      <ul><li>2 elf tribes are adjacent</li></ul>
      </>
  } else if (item.id==LegendCard.TwoLinkedDwarfs){
    return <>
      <h2>{t('help.linked-dwarfs')}</h2>
      <Picture src={legendIcon}/>2 points<br/>
      &nbsp;<br/>
      Condition:<br/>
      <ul><li>2 dwarf tribes are adjacent</li></ul>
      </>
  } else if (item.id==LegendCard.FourTribes){
    return <>
      <h2>{t('help.all-tribes')}</h2>
      <Picture src={legendIcon}/>4 points<br/>
      &nbsp;<br/>
      Condition:<br/>
      <ul>
        <li>All tribes are present: goblin, human, elf, dwarf</li>
        <li>They do not need to be adjacent</li>
      </ul>
      </>
  } else if (item.id==LegendCard.TwoVsOne_GoblinHuman){
    return <>
      <h2>{t('help.2vs1.goblin-human')}</h2>
      <Picture src={legendIcon}/>3 points<br/>
      &nbsp;<br/>
      Condition:<br/>
      <ul>
        <li>2 goblin tribes are adjacent to the same human tribe</li>
        <li>or 2 human tribes are adjacent to the same goblin tribe</li>
      </ul>
      </>
  } else if (item.id==LegendCard.TwoVsOne_GoblinElf){
    return <>
      <h2>{t('help.2vs1.goblin-elf')}</h2>
      <Picture src={legendIcon}/>3 points<br/>
      &nbsp;<br/>
      Condition:<br/>
      <ul>
        <li>2 goblin tribes are adjacent to the same elf tribe</li>
        <li>or 2 elf tribes are adjacent to the same goblin tribe</li>
      </ul>
      </>
  } else if (item.id==LegendCard.TwoVsOne_GoblinDwarf){
    return <>
      <h2>{t('help.2vs1.goblin-dwarf')}</h2>
      <Picture src={legendIcon}/>3 points<br/>
      &nbsp;<br/>
      Condition:<br/>
      <ul>
        <li>2 goblin tribes are adjacent to the same dwarf tribe</li>
        <li>or 2 dwarf tribes are adjacent to the same goblin tribe</li>
      </ul>
      </>
  } else if (item.id==LegendCard.TwoVsOne_ElfDwarf){
    return <>
      <h2>{t('help.2vs1.elf-dwarf')}</h2>
      <Picture src={legendIcon}/>3 points<br/>
      &nbsp;<br/>
      Condition:<br/>
      <ul>
        <li>2 elf tribes are adjacent to the same dwarf tribe</li>
        <li>or 2 dwarf tribes are adjacent to the same elf tribe</li>
      </ul>
      </>
  } else if (item.id==LegendCard.ThreeLinkedPlains){
    return <>
      <h2>{t('help.linked-plains')}</h2>
      <Picture src={legendIcon}/>4 points<br/>
      &nbsp;<br/>
      Condition:<br/>
      <ul><li>3 plains are adjacent</li></ul>
      </>
  } else if (item.id==LegendCard.ThreeLinkedSwamps){
    return <>
      <h2>{t('help.linked-swamps')}</h2>
      <Picture src={legendIcon}/>4 points<br/>
      &nbsp;<br/>
      Condition:<br/>
      <ul><li>3 swamps are adjacent</li></ul>
      </>
  } else if (item.id==LegendCard.ThreeLinkedMountains){
    return <>
      <h2>{t('help.linked-mountains')}</h2>
      <Picture src={legendIcon}/>4 points<br/>
      &nbsp;<br/>
      Condition:<br/>
      <ul><li>3 mountains are adjacent</li></ul>
      </>
  } else if (item.id==LegendCard.ThreeLinkedForests){
    return <>
      <h2>{t('help.linked-forests')}</h2>
      <Picture src={legendIcon}/>4 points<br/>
      &nbsp;<br/>
      Condition:<br/>
      <ul><li>3 forests are adjacent</li></ul>
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
