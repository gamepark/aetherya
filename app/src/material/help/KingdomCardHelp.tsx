/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { tr, tr2 } from '../../Translator'
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
  console.log(props)
  const { item, closeDialog } = props
  return <>
    <KingdomCardText card={item.id}/>
    <KingdomCardDeckButton closeDialog={closeDialog} location={item.location!.type}/>
  </>
}

const KingdomCardDeckButton = ({ location, closeDialog }: { location:LocationType, closeDialog: () => void }) => {
  const { i18n, t } = useTranslation()
  const lang=i18n.language

  // Only for the card from the deck
  const move = useLegalMove<MoveItem>(move => isMoveItemType(MaterialType.KingdomCard)(move) && move.location.type===LocationType.KingdomDiscard)
  if (location !== LocationType.KingdomDeck
    || !move )
    return null
  return <p><PlayMoveButton move={move} onPlay={closeDialog}>{tr(t, lang, 'help.draw')}</PlayMoveButton></p>
}

const KingdomCardText = ({ card }: { card:KingdomCard|undefined }) => {
  const { i18n, t } = useTranslation()
  const lang=i18n.language

  if (card === undefined) {
    return <>
      <h2>{tr(t, lang, 'help.kingdom-card')}</h2>
    </>
  } else if (card === KingdomCard.Plain) {
    return <>
      <h2>{tr(t, lang, 'help.plain')}</h2>
      <Picture src={plainIcon}/>
    </>
  } else if (card === KingdomCard.Swamp) {
    return <>
      <h2>{tr(t, lang, 'help.swamp')}</h2>
      <Picture src={swampIcon}/>
    </>
  } else if (card === KingdomCard.Mountain) {
    return <>
      <h2>{tr(t, lang, 'help.mountain')}</h2>
      <Picture src={mountainIcon}/>
    </>
  } else if (card === KingdomCard.Forest) {
    return <>
      <h2>{tr(t, lang, 'help.forest')}</h2>
      <Picture src={forestIcon}/>
    </>
  } else if (card === KingdomCard.Goblin) {
    return <>
      <h2>{tr(t, lang, 'help.goblin')}</h2>
      <Picture src={swampIcon}/>{tr(t, lang, 'help.plus3pointsPerAdjacentSwamp')}<br/>
      &nbsp;<br/>
      {tr2(t, lang, 'help.conflictsWith', ':')}<br/>
      <Picture src={humanIcon}/>{tr(t, lang, 'help.humans')}
      <Picture src={dwarfIcon}/>{tr(t, lang, 'help.dwarfs')}
      <Picture src={elfIcon}/>{tr(t, lang, 'help.elves')}
      <br/>&nbsp;<br/>{tr(t, lang, 'help.minus2pointsPerConflict')}
    </>
  } else if (card === KingdomCard.Human) {
    return <>
      <h2>{tr(t, lang, 'help.human')}</h2>
      <Picture src={plainIcon}/>{tr(t, lang, 'help.plus2pointsPerAdjacentPlain')}<br/>
      <Picture src={mountainIcon}/>{tr(t, lang, 'help.plus1pointPerAdjacentMountain')}<br/>
      <Picture src={forestIcon}/>{tr(t, lang, 'help.plus1pointPerAdjacentForest')}<br/>
      <Picture src={swampIcon}/>{tr(t, lang, 'help.minus1pointPerAdjacentSwamp')}<br/>
      &nbsp;<br/>
      {tr2(t, lang, 'help.conflictsWith', ':')}<br/>
      <Picture src={goblinIcon}/>{tr(t, lang, 'help.goblins')}
      <br/>&nbsp;<br/>{tr(t, lang, 'help.minus2pointsPerConflict')}
    </>
  } else if (card === KingdomCard.Elf) {
    return <>
      <h2>{tr(t, lang, 'help.elf')}</h2>
      <Picture src={forestIcon}/>{tr(t, lang, 'help.plus2pointsPerAdjacentForest')}<br/>
      <Picture src={swampIcon}/>{tr(t, lang, 'help.minus1pointPerAdjacentSwamp')}<br/>
      &nbsp;<br/>
      {tr2(t, lang, 'help.conflictsWith', ':')}<br/>
      <Picture src={goblinIcon}/>{tr(t, lang, 'help.goblins')}
      <Picture src={dwarfIcon}/>{tr(t, lang, 'help.dwarfs')}
      <br/>&nbsp;<br/>{tr(t, lang, 'help.minus2pointsPerConflict')}
    </>
  } else if (card === KingdomCard.Dwarf) {
    return <>
      <h2>{tr(t, lang, 'help.dwarf')}</h2>
      <Picture src={mountainIcon}/>{tr(t, lang, 'help.plus2pointsPerAdjacentMountain')}<br/>
      &nbsp;<br/>
      {tr2(t, lang, 'help.conflictsWith', ':')}<br/>
      <Picture src={goblinIcon}/>{tr(t, lang, 'help.goblins')}
      <Picture src={elfIcon}/>{tr(t, lang, 'help.elves')}
      <br/>&nbsp;<br/>{tr(t, lang, 'help.minus2pointsPerConflict')}
    </>
  } else if (card === KingdomCard.Portal) {
    return <>
      <h2>{tr(t, lang, 'help.portal')}</h2>
      <p>
      {tr(t, lang, 'help.portal.4foundSurroundingCardsAreAdjacent')}
      &nbsp;<br/>
      </p>
      <p>
      <Picture src={lockIcon}/>{tr(t, lang, 'help.cannotBeExchangedOncePlace')}<br/>
      <Picture src={noGoblinIcon}/>{tr(t, lang, 'help.cannotBeUsedByGoblins')}<br/>
      </p>
    </>
  } else if (card === KingdomCard.Dragon) {
    return <>
      <h2>{tr(t, lang, 'help.dragon')}</h2>
      <Picture src={dragon3Icon}/>
      <Picture src={dragon5Icon}/>
      <Picture src={dragon6Icon}/>
      &nbsp;<br />
      {tr(t, lang, 'help.dragon.1')}<br />
      {tr(t, lang, 'help.dragon.1b')}<br />
      &nbsp;<br />
      {tr(t, lang, 'help.dragon.2')}<br />
      {tr(t, lang, 'help.dragon.3')}<br />
      &nbsp;<br />
      {tr(t, lang, 'help.dragon.4')}<br />
      {tr(t, lang, 'help.dragon.5')}<br />
      {tr(t, lang, 'help.dragon.6')}
      &nbsp;<br/>
      <Picture src={lockIcon}/>{tr(t, lang, 'help.cannotBeExchangedOncePlace')}<br/>
      <Picture src={noGoblinIcon}/>{tr(t, lang, 'help.cannotBeDomesticatedByGoblins')}<br/>
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
