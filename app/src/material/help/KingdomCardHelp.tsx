/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

//import { AetheryaRules } from '@gamepark/aetherya/FarawayRules'
//import { LocationType } from '@gamepark/aetherya/material/LocationType'
//import { MaterialType } from '@gamepark/aetherya/material/MaterialType'
import { KingdomCard } from '@gamepark/aetherya/material/KingdomCard'
import { MaterialHelpProps, Picture /*, PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules */ } from '@gamepark/react-game'
import { /* Trans, */ useTranslation } from 'react-i18next'

import dwarfIcon from '../../images/icon/dwarf2.png'
import elfIcon from '../../images/icon/elf2.png'
import goblinIcon from '../../images/icon/goblin2.png'
import humanIcon from '../../images/icon/human2.png'

import forestIcon from '../../images/icon/forest2.png'
import mountainIcon from '../../images/icon/mountain2.png'
import plainIcon from '../../images/icon/plain2.png'
import swampIcon from '../../images/icon/swamp2.png'

export const KingdomCardHelp = (props: MaterialHelpProps) => {
  const {item}=props
  const { t } = useTranslation()

  if (item.id==KingdomCard.Plain){
    return <>
      <h2>{t('help.plain')}</h2>
      <Picture src={plainIcon}/>
      </>
  } else if (item.id==KingdomCard.Swamp){
    return <>
      <h2>{t('help.swamp')}</h2>
      <Picture src={swampIcon}/>
      </>
  } else if (item.id==KingdomCard.Mountain){
    return <>
      <h2>{t('help.mountain')}</h2>
      </>
  } else if (item.id==KingdomCard.Forest){
    return <>
      <h2>{t('help.forest')}</h2>
      </>
  } else if (item.id==KingdomCard.Goblin){
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
  } else if (item.id==KingdomCard.Human){
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
  } else if (item.id==KingdomCard.Elf){
    return <>
      <h2>{t('help.elf')}</h2>
      </>
  } else if (item.id==KingdomCard.Dwarf){
    return <>
      <h2>{t('help.dwarf')}</h2>
      </>
  } else if (item.id==KingdomCard.Portal){
    return <>
      <h2>{t('help.portal')}</h2>
      </>
  } else if (item.id==KingdomCard.Dragon){
    return <>
      <h2>{t('help.dragon')}</h2>
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
