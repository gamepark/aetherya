/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { KingdomCard } from '@gamepark/aetherya/material/KingdomCard'
import { MaterialHelpProps, Picture } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'
import dragon3Icon from '../../images/icon/dragon3_2.png'
import dragon5Icon from '../../images/icon/dragon5_2.png'
import dragon6Icon from '../../images/icon/dragon6_2.png'

import dwarfIcon from '../../images/icon/dwarf2.png'
import elfIcon from '../../images/icon/elf2.png'

import forestIcon from '../../images/icon/forest2.png'
import goblinIcon from '../../images/icon/goblin2.png'
import humanIcon from '../../images/icon/human2.png'
import lockIcon from '../../images/icon/lock2.png'
import mountainIcon from '../../images/icon/mountain2.png'

import noGoblinIcon from '../../images/icon/noGoblin2.png'
import plainIcon from '../../images/icon/plain2.png'
import swampIcon from '../../images/icon/swamp2.png'

export const KingdomCardHelp = (props: MaterialHelpProps) => {
  const { item } = props
  const { t } = useTranslation()

  if (item.id === undefined) {
    return <>
      <h2>{t('help.kingdom-card')}</h2>
    </>
  } else if (item.id === KingdomCard.Plain) {
    return <>
      <h2>{t('help.plain')}</h2>
      <Picture src={plainIcon}/>
    </>
  } else if (item.id === KingdomCard.Swamp) {
    return <>
      <h2>{t('help.swamp')}</h2>
      <Picture src={swampIcon}/>
    </>
  } else if (item.id === KingdomCard.Mountain) {
    return <>
      <h2>{t('help.mountain')}</h2>
      <Picture src={mountainIcon}/>
    </>
  } else if (item.id === KingdomCard.Forest) {
    return <>
      <h2>{t('help.forest')}</h2>
      <Picture src={forestIcon}/>
    </>
  } else if (item.id === KingdomCard.Goblin) {
    return <>
      <h2>{t('help.goblin')}</h2>
      <Picture src={swampIcon}/>+3 points per adjacent swamp<br/>
      &nbsp;<br/>
      Conflicts with:<br/>
      <Picture src={humanIcon}/>humans
      <Picture src={dwarfIcon}/>dwarfs
      <Picture src={elfIcon}/>elves
      <br/>&nbsp;<br/>-2 points per conflict
    </>
  } else if (item.id === KingdomCard.Human) {
    return <>
      <h2>{t('help.human')}</h2>
      <Picture src={plainIcon}/>+2 points per adjacent plain<br/>
      <Picture src={mountainIcon}/>+1 point per adjacent mountain<br/>
      <Picture src={forestIcon}/>+1 point per adjacent forest<br/>
      <Picture src={swampIcon}/>-1 point per adjacent swamp<br/>
      &nbsp;<br/>
      Conflicts with:<br/>
      <Picture src={goblinIcon}/>goblins
      <br/>&nbsp;<br/>-2 points per conflict
    </>
  } else if (item.id === KingdomCard.Elf) {
    return <>
      <h2>{t('help.elf')}</h2>
      <Picture src={forestIcon}/>+2 points per adjacent forest<br/>
      <Picture src={swampIcon}/>-1 point per adjacent swamp<br/>
      &nbsp;<br/>
      Conflicts with:<br/>
      <Picture src={goblinIcon}/>goblins
      <Picture src={dwarfIcon}/>dwarfs
      <br/>&nbsp;<br/>-2 points per conflict
    </>
  } else if (item.id === KingdomCard.Dwarf) {
    return <>
      <h2>{t('help.dwarf')}</h2>
      <Picture src={mountainIcon}/>+2 points per adjacent mountain<br/>
      &nbsp;<br/>
      Conflicts with:<br/>
      <Picture src={goblinIcon}/>goblins
      <Picture src={elfIcon}/>elves
      <br/>&nbsp;<br/>-2 points per conflict
    </>
  } else if (item.id === KingdomCard.Portal) {
    return <>
      <h2>{t('help.portal')}</h2>
      <Picture src={lockIcon}/>Cannot be exchanged once placed<br/>
      <Picture src={noGoblinIcon}/>Cannot be used by goblins<br/>
      &nbsp;<br/>
      The 4 cards surrounding the portal are considered adjacent.
    </>
  } else if (item.id === KingdomCard.Dragon) {
    return <>
      <h2>{t('help.dragon')}</h2>
      <Picture src={lockIcon}/>Cannot be exchanged once placed<br/>
      <Picture src={noGoblinIcon}/>Cannot be domesticated by goblins<br/>
      &nbsp;<br/>
      <Picture src={dragon3Icon}/>
      <Picture src={dragon5Icon}/>
      <Picture src={dragon6Icon}/>
      <br/>
      If there's only 1 dragon, its value is 3.<br/>
      If there are 2 dragons, they both have a value of 4.<br/>
      If there are 3 dragons or more, each of them have a value of 6.<br/>
      <br/>
      A wild dragon makes the player lose its value as points.
      A domesticated dragon makes the player win its value as points.
      <br/>
      A dragon is domesticated if it's surrounded by 2 humans, 2 elves or 2 dwarfs,
      otherwise it's wild.
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
