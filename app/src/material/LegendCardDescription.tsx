import { LegendCard } from '@gamepark/aetherya/material/LegendCard'
import { CardDescription } from '@gamepark/react-game'
import LegendBack from '../images/LegendBack.jpg'
import LinkedHumanElf from '../images/LegendHumanElf.jpg'
import LinkedHumanDwarf from '../images/LegendHumanDwarf.jpg'
import TwoLinkedGoblins from '../images/LegendGoblin2.jpg'
import TwoLinkedHumans from '../images/LegendHuman2.jpg'
import TwoLinkedElves from '../images/LegendElf2.jpg'
import TwoLinkedDwarfs from '../images/LegendDwarf2.jpg'
import FourTribes from '../images/LegendAllTribes.jpg'
import TwoVsOne_GoblinHuman from '../images/Legend2v1GoblinHuman.jpg'
import TwoVsOne_GoblinElf from '../images/Legend2v1GoblinElf.jpg'
import TwoVsOne_GoblinDwarf from '../images/Legend2v1GoblinDwarf.jpg'
import TwoVsOne_ElfDwarf from '../images/Legend2v1ElfDwarf.jpg'
import ThreeLinkedPlains from '../images/LegendPlains.jpg'
import ThreeLinkedSwamps from '../images/LegendSwamps.jpg'
import ThreeLinkedMountains from '../images/LegendMountains.jpg'
import ThreeLinkedForests from '../images/LegendForests.jpg'
import { LegendCardHelp } from './help/LegendCardHelp'

export class LegendCardDescription extends CardDescription {
  height = 7
  width = 7
  borderRadius = 0.5

  backImage = LegendBack
  help = LegendCardHelp

  images = {
    [LegendCard.LinkedHumanElf]: LinkedHumanElf,
    [LegendCard.LinkedHumanDwarf]: LinkedHumanDwarf,
    [LegendCard.TwoLinkedGoblins]: TwoLinkedGoblins,
    [LegendCard.TwoLinkedHumans]: TwoLinkedHumans,
    [LegendCard.TwoLinkedElves]: TwoLinkedElves,
    [LegendCard.TwoLinkedDwarfs]: TwoLinkedDwarfs,
    [LegendCard.FourTribes]: FourTribes,
    [LegendCard.TwoVsOne_GoblinHuman]: TwoVsOne_GoblinHuman,
    [LegendCard.TwoVsOne_GoblinElf]: TwoVsOne_GoblinElf,
    [LegendCard.TwoVsOne_GoblinDwarf]: TwoVsOne_GoblinDwarf,
    [LegendCard.TwoVsOne_ElfDwarf]: TwoVsOne_ElfDwarf,
    [LegendCard.ThreeLinkedPlains]: ThreeLinkedPlains,
    [LegendCard.ThreeLinkedSwamps]: ThreeLinkedSwamps,
    [LegendCard.ThreeLinkedMountains]: ThreeLinkedMountains,
    [LegendCard.ThreeLinkedForests]: ThreeLinkedForests
  }
}

export const legendCardDescription = new LegendCardDescription()
export const spaceBetweenLegendCards = 1
