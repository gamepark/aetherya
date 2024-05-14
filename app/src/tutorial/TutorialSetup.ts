import { AetheryaSetup } from '@gamepark/aetherya/AetheryaSetup'
import { KingdomCard } from '@gamepark/aetherya/material/KingdomCard'
import { LegendCard } from '@gamepark/aetherya/material/LegendCard'
import { LocationType } from '@gamepark/aetherya/material/LocationType'
import { MaterialType } from '@gamepark/aetherya/material/MaterialType'
import { RuleId } from '@gamepark/aetherya/rules/RuleId'
import { MaterialDeck } from '@gamepark/rules-api'

const me = 1
const opponent = 2
export class TutorialSetup extends AetheryaSetup {
  setupLegendLine() {
    const deck = this.material(MaterialType.LegendCard).deck()
    const cards = [
      LegendCard.LinkedHumanElf,
      LegendCard.ThreeLinkedForests,
      LegendCard.TwoLinkedHumans,
      LegendCard.FourTribes,
      LegendCard.ThreeLinkedPlains,
      LegendCard.TwoVsOne_GoblinDwarf,
      LegendCard.LinkedHumanDwarf,
      LegendCard.TwoLinkedGoblins]
    for (let i=1; i<=8; i++){
      deck
        .filter((item) => item.id===cards[i-1])
        .deal({ type: LocationType.LegendLine, x:i }, 1)
    }
  }

  // TODO - Tweak the deck of kingdom cards
  cardDeck(card:KingdomCard){
    return this
      .material(MaterialType.KingdomCard)
      .location(LocationType.KingdomDeck)
      .filter((item)=>item.id === card)
      .deck()
  }

  putCard(player:number, x:number, y:number, visible:boolean, deck:MaterialDeck){
    deck.deal({ type: LocationType.PlayerBoard, player:player, x:x, y:y, rotation:visible }, 1)
  }

  setupPlayers() {
    const plainDeck = this.cardDeck(KingdomCard.Plain)
    const swampDeck = this.cardDeck(KingdomCard.Swamp)
    const forestDeck = this.cardDeck(KingdomCard.Forest)
    const mountainDeck = this.cardDeck(KingdomCard.Mountain)
    const humanDeck = this.cardDeck(KingdomCard.Human)
    const elfDeck = this.cardDeck(KingdomCard.Elf)
    const dwarfDeck = this.cardDeck(KingdomCard.Dwarf)
    const goblinDeck = this.cardDeck(KingdomCard.Goblin)
    const dragonDeck = this.cardDeck(KingdomCard.Dragon)
    const portalDeck = this.cardDeck(KingdomCard.Portal)

    // In boards
    // Plain:3, Swamp:3, Forest:3, Mountain:3
    // Human:3, Elf:3, Dwarf:3, Goblin:3
    // Dragon:4, Portal:4

    // My cards
    this.putCard(me, 1, 1, false, portalDeck)
    this.putCard(me, 2, 1, false, elfDeck)
    this.putCard(me, 3, 1, false, goblinDeck)
    this.putCard(me, 4, 1, false, goblinDeck)

    this.putCard(me, 1, 2, false, humanDeck)
    this.putCard(me, 2, 2, true, dwarfDeck)
    this.putCard(me, 3, 2, true, swampDeck)
    this.putCard(me, 4, 2, false, portalDeck)

    this.putCard(me, 1, 3, false, dragonDeck)
    this.putCard(me, 2, 3, true, plainDeck)
    this.putCard(me, 3, 3, true, humanDeck)
    this.putCard(me, 4, 3, false, portalDeck)

    this.putCard(me, 1, 4, false, plainDeck)
    this.putCard(me, 2, 4, false, elfDeck)
    this.putCard(me, 3, 4, false, dragonDeck)
    this.putCard(me, 4, 4, false, forestDeck)

    // Opponent's cards
    this.putCard(opponent, 1, 1, false, forestDeck)
    this.putCard(opponent, 2, 1, false, humanDeck)
    this.putCard(opponent, 3, 1, false, dragonDeck)
    this.putCard(opponent, 4, 1, false, dragonDeck)

    this.putCard(opponent, 1, 2, false, plainDeck)
    this.putCard(opponent, 2, 2, true, swampDeck)
    this.putCard(opponent, 3, 2, true, elfDeck)
    this.putCard(opponent, 4, 2, false, mountainDeck)

    this.putCard(opponent, 1, 3, false, mountainDeck)
    this.putCard(opponent, 2, 3, true, mountainDeck)
    this.putCard(opponent, 3, 3, true, plainDeck)
    this.putCard(opponent, 4, 3, false, dwarfDeck)

    this.putCard(opponent, 1, 4, false, swampDeck)
    this.putCard(opponent, 2, 4, false, forestDeck)
    this.putCard(opponent, 3, 4, false, goblinDeck)
    this.putCard(opponent, 4, 4, false, dwarfDeck)

    // Reorder the deck
    portalDeck.deal({ type: LocationType.KingdomDeck, rotation:false }, 1)
    swampDeck.deal({ type: LocationType.KingdomDeck, rotation:false }, 1)
    goblinDeck.deal({ type: LocationType.KingdomDeck, rotation:false }, 1)
    mountainDeck.deal({ type: LocationType.KingdomDeck, rotation:false }, 1)
  }

  start() {
    this.startPlayerTurn(RuleId.ChooseCard, this.game.players[0])
//    this.startSimultaneousRule(RuleId.PrepareGame)
  }
}
