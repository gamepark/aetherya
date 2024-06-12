/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { tr, tr2 } from '../../Translator'
import { LegendCard } from '@gamepark/aetherya/material/LegendCard'
import { LocationType } from '@gamepark/aetherya/material/LocationType'
import { MaterialType } from '@gamepark/aetherya/material/MaterialType'
import { MaterialHelpProps, Picture, PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isMoveItemType, MoveItem } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'
import legendIcon from '../../images/icon/points2.png'

export const LegendCardHelp = (props: MaterialHelpProps) => {
  const { item, closeDialog } = props
  return <>
    <LegendCardText card={ item.id }/>
    <LegendCardButton closeDialog={closeDialog}/>
  </>
}

const LegendCardButton = ({ closeDialog }: { closeDialog: () => void }) => {
  const { i18n, t } = useTranslation()
  const lang=i18n.language
  const move = useLegalMove<MoveItem>(move => isMoveItemType(MaterialType.LegendCard)(move) && move.location.type===LocationType.PlayerLegendLine)
  if (!move) return null
  return <p><PlayMoveButton move={move} onPlay={closeDialog}>{tr(t, lang, 'help.pick')}</PlayMoveButton></p>
}

const LegendCardText = ({ card }: { card:LegendCard|undefined }) => {
  const { i18n, t } = useTranslation()
  const lang=i18n.language

  if (card === undefined) {
    return <>
      <h2>{tr(t, lang, 'help.legend-card')}</h2>
    </>
  } else if (card === LegendCard.LinkedHumanElf) {
    return <>
      <h2>{tr(t, lang, 'help.linked-human-elf')}</h2>
      <Picture src={legendIcon}/>{tr(t, lang, 'help.2points')}<br/>
      &nbsp;<br/>
      {tr2(t, lang, 'help.condition', ':')}<br/>
      <ul>
        <li>{tr(t, lang, 'help.linkedHumanElfCondition')}</li>
      </ul>
    </>
  } else if (card === LegendCard.LinkedHumanDwarf) {
    return <>
      <h2>{tr(t, lang, 'help.linked-human-dwarf')}</h2>
      <Picture src={legendIcon}/>{tr(t, lang, 'help.2points')}<br/>
      &nbsp;<br/>
      {tr2(t, lang, 'help.condition', ':')}<br/>
      <ul>
      <li>{tr(t, lang, 'help.linkedHumanDwarfCondition')}</li>
      </ul>
    </>
  } else if (card === LegendCard.TwoLinkedGoblins) {
    return <>
      <h2>{tr(t, lang, 'help.linked-goblins')}</h2>
      <Picture src={legendIcon}/>{tr(t, lang, 'help.2points')}<br/>
      &nbsp;<br/>
      {tr2(t, lang, 'help.condition', ':')}<br/>
      <ul>
        <li>{tr(t, lang, 'help.2linkedGoblinsCondition')}</li>
      </ul>
    </>
  } else if (card === LegendCard.TwoLinkedHumans) {
    return <>
      <h2>{tr(t, lang, 'help.linked-humans')}</h2>
      <Picture src={legendIcon}/>{tr(t, lang, 'help.2points')}<br/>
      &nbsp;<br/>
      {tr2(t, lang, 'help.condition', ':')}<br/>
      <ul>
        <li>{tr(t, lang, 'help.2linkedHumansCondition')}</li>
      </ul>
    </>
  } else if (card === LegendCard.TwoLinkedElves) {
    return <>
      <h2>{tr(t, lang, 'help.linked-elves')}</h2>
      <Picture src={legendIcon}/>{tr(t, lang, 'help.2points')}<br/>
      &nbsp;<br/>
      {tr2(t, lang, 'help.condition', ':')}<br/>
      <ul>
        <li>{tr(t, lang, 'help.2linkedElvesCondition')}</li>
      </ul>
    </>
  } else if (card === LegendCard.TwoLinkedDwarfs) {
    return <>
      <h2>{tr(t, lang, 'help.linked-dwarfs')}</h2>
      <Picture src={legendIcon}/>{tr(t, lang, 'help.2points')}<br/>
      &nbsp;<br/>
      {tr2(t, lang, 'help.condition', ':')}<br/>
      <ul>
        <li>{tr(t, lang, 'help.2linkedDwarfsCondition')}</li>
      </ul>
    </>
  } else if (card === LegendCard.FourTribes) {
    return <>
      <h2>{tr(t, lang, 'help.all-tribes')}</h2>
      <Picture src={legendIcon}/>{tr(t, lang, 'help.4points')}<br/>
      &nbsp;<br/>
      {tr2(t, lang, 'help.condition', ':')}<br/>
      <ul>
        <li>{tr(t, lang, 'help.allTribes.1')}</li>
        <li>{tr(t, lang, 'help.allTribes.2')}</li>
      </ul>
    </>
  } else if (card === LegendCard.TwoVsOne_GoblinHuman) {
    return <>
      <h2>{tr(t, lang, 'help.2vs1.goblin-human')}</h2>
      <Picture src={legendIcon}/>{tr(t, lang, 'help.3points')}<br/>
      &nbsp;<br/>
      {tr2(t, lang, 'help.condition', ':')}<br/>
      <ul>
        <li>{tr(t, lang, 'help.2vs1.goblin-human.1')}</li>
        <li>{tr(t, lang, 'help.2vs1.goblin-human.2')}</li>
      </ul>
    </>
  } else if (card === LegendCard.TwoVsOne_GoblinElf) {
    return <>
      <h2>{tr(t, lang, 'help.2vs1.goblin-elf')}</h2>
      <Picture src={legendIcon}/>{tr(t, lang, 'help.3points')}<br/>
      &nbsp;<br/>
      {tr2(t, lang, 'help.condition', ':')}<br/>
      <ul>
        <li>{tr(t, lang, 'help.2vs1.goblin-elf.1')}</li>
        <li>{tr(t, lang, 'help.2vs1.goblin-elf.2')}</li>
      </ul>
    </>
  } else if (card === LegendCard.TwoVsOne_GoblinDwarf) {
    return <>
      <h2>{tr(t, lang, 'help.2vs1.goblin-dwarf')}</h2>
      <Picture src={legendIcon}/>{tr(t, lang, 'help.3points')}<br/>
      &nbsp;<br/>
      {tr2(t, lang, 'help.condition', ':')}<br/>
      <ul>
        <li>{tr(t, lang, 'help.2vs1.goblin-dwarf.1')}</li>
        <li>{tr(t, lang, 'help.2vs1.goblin-dwarf.2')}</li>
      </ul>
    </>
  } else if (card === LegendCard.TwoVsOne_ElfDwarf) {
    return <>
      <h2>{tr(t, lang, 'help.2vs1.elf-dwarf')}</h2>
      <Picture src={legendIcon}/>{tr(t, lang, 'help.3points')}<br/>
      &nbsp;<br/>
      {tr2(t, lang, 'help.condition', ':')}<br/>
      <ul>
        <li>{tr(t, lang, 'help.2vs1.elf-dwarf.1')}</li>
        <li>{tr(t, lang, 'help.2vs1.elf-dwarf.2')}</li>
      </ul>
    </>
  } else if (card === LegendCard.ThreeLinkedPlains) {
    return <>
      <h2>{tr(t, lang, 'help.linked-plains')}</h2>
      <Picture src={legendIcon}/>{tr(t, lang, 'help.4points')}<br/>
      &nbsp;<br/>
      {tr2(t, lang, 'help.condition', ':')}<br/>
      <ul>
        <li>{tr(t, lang, 'help.linked-plains.1')}</li>
      </ul>
    </>
  } else if (card === LegendCard.ThreeLinkedSwamps) {
    return <>
      <h2>{tr(t, lang, 'help.linked-swamps')}</h2>
      <Picture src={legendIcon}/>{tr(t, lang, 'help.4points')}<br/>
      &nbsp;<br/>
      {tr2(t, lang, 'help.condition', ':')}<br/>
      <ul>
        <li>{tr(t, lang, 'help.linked-swamps.1')}</li>
      </ul>
    </>
  } else if (card === LegendCard.ThreeLinkedMountains) {
    return <>
      <h2>{tr(t, lang, 'help.linked-mountains')}</h2>
      <Picture src={legendIcon}/>{tr(t, lang, 'help.4points')}<br/>
      &nbsp;<br/>
      {tr2(t, lang, 'help.condition', ':')}<br/>
      <ul>
        <li>{tr(t, lang, 'help.linked-mountains.1')}</li>
        <li>3 mountains are adjacent</li>
      </ul>
    </>
  } else if (card === LegendCard.ThreeLinkedForests) {
    return <>
      <h2>{tr(t, lang, 'help.linked-forests')}</h2>
      <Picture src={legendIcon}/>{tr(t, lang, 'help.4points')}<br/>
      &nbsp;<br/>
      {tr2(t, lang, 'help.condition', ':')}<br/>
      <ul>
        <li>{tr(t, lang, 'help.linked-forests.1')}</li>
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
