/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { LegendaryCard } from '@gamepark/aetherya/material/LegendaryCard'
import { MaterialHelpProps, /*Picture /*, PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules */ } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

/*
import dwarfIcon from '../../images/icon/dwarf2.png'
import elfIcon from '../../images/icon/elf2.png'
import goblinIcon from '../../images/icon/goblin2.png'
import humanIcon from '../../images/icon/human2.png'

import forestIcon from '../../images/icon/forest2.png'
import mountainIcon from '../../images/icon/mountain2.png'
import plainIcon from '../../images/icon/plain2.png'
import swampIcon from '../../images/icon/swamp2.png'

import noGoblinIcon from '../../images/icon/noGoblin2.png'
import lockIcon from '../../images/icon/lock2.png'
import dragon3Icon from '../../images/icon/dragon3_2.png'
import dragon5Icon from '../../images/icon/dragon5_2.png'
import dragon6Icon from '../../images/icon/dragon6_2.png'
*/

export const LegendaryCardHelp = (props: MaterialHelpProps) => {
  const {item}=props
  const { t } = useTranslation()

  if (item.id==LegendaryCard.LinkedHumanElf){
    return <>
      <h2>{t('help.linked-human-elf')}</h2>
      Value: 2 points<br/>
      &nbsp;<br/>
      Condition:<br/>
      <ul><li>A human tribe is adjacent to an elf tribe</li></ul>
      </>
  } else if (item.id==LegendaryCard.LinkedHumanDwarf){
    return <>
      <h2>{t('help.linked-human-dwarf')}</h2>
      Value: 2 points<br/>
      &nbsp;<br/>
      Condition:<br/>
      <ul><li>A human tribe is adjacent to a dwarf tribe</li></ul>
      </>
  } else if (item.id==LegendaryCard.TwoLinkedGoblins){
    return <>
      <h2>{t('help.linked-goblins')}</h2>
      Value: 2 points<br/>
      &nbsp;<br/>
      Condition:<br/>
      <ul><li>2 goblin tribes are adjacent</li></ul>
      </>
  } else if (item.id==LegendaryCard.TwoLinkedHumans){
    return <>
      <h2>{t('help.linked-humans')}</h2>
      Value: 2 points<br/>
      &nbsp;<br/>
      Condition:<br/>
      <ul><li>2 human tribes are adjacent</li></ul>
      </>
  } else if (item.id==LegendaryCard.TwoLinkedElves){
    return <>
      <h2>{t('help.linked-elves')}</h2>
      Value: 2 points<br/>
      &nbsp;<br/>
      Condition:<br/>
      <ul><li>2 elf tribes are adjacent</li></ul>
      </>
  } else if (item.id==LegendaryCard.TwoLinkedDwarfs){
    return <>
      <h2>{t('help.linked-dwarfs')}</h2>
      Value: 2 points<br/>
      &nbsp;<br/>
      Condition:<br/>
      <ul><li>2 dwarf tribes are adjacent</li></ul>
      </>
  } else if (item.id==LegendaryCard.FourTribes){
    return <>
      <h2>{t('help.all-tribes')}</h2>
      Value: 4 points<br/>
      &nbsp;<br/>
      Condition:<br/>
      <ul>
        <li>All tribes are present: goblin, human, elf, dwarf</li>
        <li>They do not need to be adjacent</li>
      </ul>
      </>
  } else if (item.id==LegendaryCard.TwoVsOne_GoblinHuman){
    return <>
      <h2>{t('help.2vs1.goblin-human')}</h2>
      Value: 3 points<br/>
      &nbsp;<br/>
      Condition:<br/>
      <ul>
        <li>2 goblin tribes are adjacent to the same human tribe</li>
        <li>or 2 human tribes are adjacent to the same goblin tribe</li>
      </ul>
      </>
  } else if (item.id==LegendaryCard.TwoVsOne_GoblinElf){
    return <>
      <h2>{t('help.2vs1.goblin-elf')}</h2>
      Value: 3 points<br/>
      &nbsp;<br/>
      Condition:<br/>
      <ul>
        <li>2 goblin tribes are adjacent to the same elf tribe</li>
        <li>or 2 elf tribes are adjacent to the same goblin tribe</li>
      </ul>
      </>
  } else if (item.id==LegendaryCard.TwoVsOne_GoblinDwarf){
    return <>
      <h2>{t('help.2vs1.goblin-dwarf')}</h2>
      Value: 3 points<br/>
      &nbsp;<br/>
      Condition:<br/>
      <ul>
        <li>2 goblin tribes are adjacent to the same dwarf tribe</li>
        <li>or 2 dwarf tribes are adjacent to the same goblin tribe</li>
      </ul>
      </>
  } else if (item.id==LegendaryCard.TwoVsOne_ElfDwarf){
    return <>
      <h2>{t('help.2vs1.elf-dwarf')}</h2>
      Value: 3 points<br/>
      &nbsp;<br/>
      Condition:<br/>
      <ul>
        <li>2 elf tribes are adjacent to the same dwarf tribe</li>
        <li>or 2 dwarf tribes are adjacent to the same elf tribe</li>
      </ul>
      </>
  } else if (item.id==LegendaryCard.ThreeLinkedPlains){
    return <>
      <h2>{t('help.linked-plains')}</h2>
      Value: 4 points<br/>
      &nbsp;<br/>
      Condition:<br/>
      <ul><li>3 plains are adjacent</li></ul>
      </>
  } else if (item.id==LegendaryCard.ThreeLinkedSwamps){
    return <>
      <h2>{t('help.linked-swamps')}</h2>
      Value: 4 points<br/>
      &nbsp;<br/>
      Condition:<br/>
      <ul><li>3 swamps are adjacent</li></ul>
      </>
  } else if (item.id==LegendaryCard.ThreeLinkedMountains){
    return <>
      <h2>{t('help.linked-mountains')}</h2>
      Value: 4 points<br/>
      &nbsp;<br/>
      Condition:<br/>
      <ul><li>3 mountains are adjacent</li></ul>
      </>
  } else if (item.id==LegendaryCard.ThreeLinkedForests){
    return <>
      <h2>{t('help.linked-forests')}</h2>
      Value: 4 points<br/>
      &nbsp;<br/>
      Condition:<br/>
      <ul><li>3 forests are adjacent</li></ul>
      </>
  }

  return <>*** Missing description ***</>

//    <h2>{t('help.region', { number })}</h2>
//    {item.location && <RegionLocation location={item.location}/>}
//    {itemIndex !== undefined && <RegionButton itemIndex={itemIndex} closeDialog={closeDialog}/>}
//    {item.id && <RegionHelp region={item.id}/>}
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
