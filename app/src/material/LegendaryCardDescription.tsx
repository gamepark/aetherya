import { LegendaryCard } from '@gamepark/aetherya/material/LegendaryCard'
import { CardDescription } from '@gamepark/react-game'
import LegendaryBack from '../images/LegendaryBack.jpg'
import LinkedHumanElf from '../images/LegendHumanElf.jpg'
import LinkedHumanDwarf from '../images/LegendHumanDwarf.jpg'
import TwoLinkedGoblins from '../images/LegendGoblin2.jpg'
import TwoLinkedHumans from '../images/LegendHuman2.jpg'
import TwoLinkedElves from '../images/LegendElf2.jpg'
import TwoLinkedDwarves from '../images/LegendDwarf2.jpg'
import FourTribes from '../images/LegendAllTribes.jpg'
import TwoVsOne_GoblinHuman from '../images/Legend2v1GoblinHuman.jpg'
import TwoVsOne_GoblinElf from '../images/Legend2v1GoblinElf.jpg'
import TwoVsOne_GoblinDwarf from '../images/Legend2v1GoblinDwarf.jpg'
import TwoVsOne_ElfDwarf from '../images/Legend2v1ElfDwarf.jpg'
import ThreeLinkedPlains from '../images/LegendPlains.jpg'
import ThreeLinkedSwamps from '../images/LegendSwamps.jpg'
import ThreeLinkedMountains from '../images/LegendMountains.jpg'
import ThreeLinkedForests from '../images/LegendForests.jpg'

export class LegendaryCardDescription extends CardDescription {
  height = 7
  width = 7
  borderRadius = 0.5

  backImage = LegendaryBack

  images = {
    [LegendaryCard.LinkedHumanElf]: LinkedHumanElf,
    [LegendaryCard.LinkedHumanDwarf]: LinkedHumanDwarf,
    [LegendaryCard.TwoLinkedGoblins]: TwoLinkedGoblins,
    [LegendaryCard.TwoLinkedHumans]: TwoLinkedHumans,
    [LegendaryCard.TwoLinkedElves]: TwoLinkedElves,
    [LegendaryCard.TwoLinkedDwarves]: TwoLinkedDwarves,
    [LegendaryCard.FourTribes]: FourTribes,
    [LegendaryCard.TwoVsOne_GoblinHuman]: TwoVsOne_GoblinHuman,
    [LegendaryCard.TwoVsOne_GoblinElf]: TwoVsOne_GoblinElf,
    [LegendaryCard.TwoVsOne_GoblinDwarf]: TwoVsOne_GoblinDwarf,
    [LegendaryCard.TwoVsOne_ElfDwarf]: TwoVsOne_ElfDwarf,
    [LegendaryCard.ThreeLinkedPlains]: ThreeLinkedPlains,
    [LegendaryCard.ThreeLinkedSwamps]: ThreeLinkedSwamps,
    [LegendaryCard.ThreeLinkedMountains]: ThreeLinkedMountains,
    [LegendaryCard.ThreeLinkedForests]: ThreeLinkedForests
  }
}

export const legendaryCardDescription = new LegendaryCardDescription()
export const spaceBetweenLegendaryCards = 1
