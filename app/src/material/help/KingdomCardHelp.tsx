/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { KingdomCard } from '@gamepark/aetherya/material/KingdomCard'
import { LocationType } from '@gamepark/aetherya/material/LocationType'
import { MaterialType } from '@gamepark/aetherya/material/MaterialType'
import { MaterialHelpProps, Picture, PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isMoveItemType, MoveItem } from '@gamepark/rules-api'
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
  const { item, closeDialog } = props
  return <>
    <KingdomCardText card={ item.id }/>
    <KingdomCardDeckButton closeDialog={closeDialog}/>
  </>
}

const KingdomCardDeckButton = ({ closeDialog }: { closeDialog: () => void }) => {
  const { t } = useTranslation()
  const move = useLegalMove<MoveItem>(move => isMoveItemType(MaterialType.KingdomCard)(move) && move.location.type===LocationType.KingdomDiscard)
  if (!move) return null
  return <p><PlayMoveButton move={move} onPlay={closeDialog}>{t('help.draw')}</PlayMoveButton></p>
}

const KingdomCardText = ({ card }: { card:KingdomCard|undefined }) => {
  const { t } = useTranslation()

  if (card === undefined) {
    return <>
      <h2>{t('help.kingdom-card')}</h2>
    </>
  } else if (card === KingdomCard.Plain) {
    return <>
      <h2>{t('help.plain')}</h2>
      <Picture src={plainIcon}/>
    </>
  } else if (card === KingdomCard.Swamp) {
    return <>
      <h2>{t('help.swamp')}</h2>
      <Picture src={swampIcon}/>
    </>
  } else if (card === KingdomCard.Mountain) {
    return <>
      <h2>{t('help.mountain')}</h2>
      <Picture src={mountainIcon}/>
    </>
  } else if (card === KingdomCard.Forest) {
    return <>
      <h2>{t('help.forest')}</h2>
      <Picture src={forestIcon}/>
    </>
  } else if (card === KingdomCard.Goblin) {
    return <>
      <h2>{t('help.goblin')}</h2>
      <Picture src={swampIcon}/>{t('help.plus3pointsPerAdjacentSwamp')}<br/>
      &nbsp;<br/>
      {t('help.conflictsWith')}:<br/>
      <Picture src={humanIcon}/>{t('help.humans')}
      <Picture src={dwarfIcon}/>{t('help.dwarfs')}
      <Picture src={elfIcon}/>{t('help.elves')}
      <br/>&nbsp;<br/>{t('help.minus2pointsPerConflict')}
    </>
  } else if (card === KingdomCard.Human) {
    return <>
      <h2>{t('help.human')}</h2>
      <Picture src={plainIcon}/>{t('help.plus2pointsPerAdjacentPlain')}<br/>
      <Picture src={mountainIcon}/>{t('help.plus1pointPerAdjacentMountain')}<br/>
      <Picture src={forestIcon}/>{t('help.plus1pointPerAdjacentForest')}<br/>
      <Picture src={swampIcon}/>{t('help.minus1pointPerAdjacentSwamp')}<br/>
      &nbsp;<br/>
      {t('help.conflictsWith')}:<br/>
      <Picture src={goblinIcon}/>{t('help.goblins')}
      <br/>&nbsp;<br/>{t('help.minus2pointsPerConflict')}
    </>
  } else if (card === KingdomCard.Elf) {
    return <>
      <h2>{t('help.elf')}</h2>
      <Picture src={forestIcon}/>{t('help.plus2pointsPerAdjacentForest')}<br/>
      <Picture src={swampIcon}/>{t('help.minus1pointPerAdjacentSwamp')}<br/>
      &nbsp;<br/>
      {t('help.conflictsWith')}:<br/>
      <Picture src={goblinIcon}/>{t('help.goblins')}
      <Picture src={dwarfIcon}/>{t('help.dwarfs')}
      <br/>&nbsp;<br/>{t('help.minus2pointsPerConflict')}
    </>
  } else if (card === KingdomCard.Dwarf) {
    return <>
      <h2>{t('help.dwarf')}</h2>
      <Picture src={mountainIcon}/>{t('help.plus2pointsPerAdjacentMountain')}<br/>
      &nbsp;<br/>
      {t('help.conflictsWith')}:<br/>
      <Picture src={goblinIcon}/>{t('help.goblins')}
      <Picture src={elfIcon}/>{t('help.elves')}
      <br/>&nbsp;<br/>{t('help.minus2pointsPerConflict')}
    </>
  } else if (card === KingdomCard.Portal) {
    return <>
      <h2>{t('help.portal')}</h2>
      {t('help.portal.4foundSurroundingCardsAreAdjacent')}
      &nbsp;<br/>
      <Picture src={lockIcon}/>{t('help.cannotBeExchangedOncePlace')}<br/>
      <Picture src={noGoblinIcon}/>{t('help.cannotBeUsedByGoblins')}<br/>
    </>
  } else if (card === KingdomCard.Dragon) {
    return <>
      <h2>{t('help.dragon')}</h2>
      <Picture src={dragon3Icon}/>
      <Picture src={dragon5Icon}/>
      <Picture src={dragon6Icon}/>
      &nbsp;<br />
      {t('help.dragon.1')}<br />
      &nbsp;<br />
      {t('help.dragon.2')}<br />
      {t('help.dragon.3')}<br />
      &nbsp;<br />
      {t('help.dragon.4')}<br />
      {t('help.dragon.5')}<br />
      {t('help.dragon.6')}
      &nbsp;<br/>
      <Picture src={lockIcon}/>{t('help.cannotBeExchangedOncePlace')}<br/>
      <Picture src={noGoblinIcon}/>{t('help.cannotBeDomesticatedByGoblins')}<br/>
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
