import { KingdomCard } from '@gamepark/aetherya/material/KingdomCard'
import { CardDescription } from '@gamepark/react-game'
import KingdomBack from '../images/KingdomBack.jpg'
import Plain from '../images/KingdomPlain.jpg'
import Swamp from '../images/KingdomSwamp.jpg'
import Mountain from '../images/KingdomMountain.jpg'
import Forest from '../images/KingdomForest.jpg'
import Goblin from '../images/KingdomGoblin.jpg'
import Human from '../images/KingdomHuman.jpg'
import Elf from '../images/KingdomElf.jpg'
import Dwarf from '../images/KingdomDwarf.jpg'
import Portal from '../images/KingdomPortal.jpg'
import Dragon from '../images/KingdomDragon.jpg'

export class KingdomCardDescription extends CardDescription {
  height = 7
  width = 7
  borderRadius = 0.5

  backImage = KingdomBack

  images = {
    [KingdomCard.Plain]: Plain,
    [KingdomCard.Swamp]: Swamp,
    [KingdomCard.Mountain]: Mountain,
    [KingdomCard.Forest]: Forest,
    [KingdomCard.Goblin]: Goblin,
    [KingdomCard.Human]: Human,
    [KingdomCard.Elf]: Elf,
    [KingdomCard.Dwarf]: Dwarf,
    [KingdomCard.Portal]: Portal,
    [KingdomCard.Dragon]: Dragon
  }
}

export const kingdomCardDescription = new KingdomCardDescription()
export const spaceBetweenKingdomCards = 1
