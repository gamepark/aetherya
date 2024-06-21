import { AetheryaSetup } from './AetheryaSetup'
import { KingdomCard } from './material/KingdomCard'
import { LegendCard } from './material/LegendCard'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { RuleId } from './rules/RuleId'

const P = KingdomCard.Plain
const F = KingdomCard.Forest
const M = KingdomCard.Mountain
const S = KingdomCard.Swamp
const H = KingdomCard.Human
const E = KingdomCard.Elf
const N = KingdomCard.Dwarf
const G = KingdomCard.Goblin
const D = KingdomCard.Dragon
const L = KingdomCard.Portal

const LG_LHE=LegendCard.LinkedHumanElf
const LG_LHD=LegendCard.LinkedHumanDwarf
const LG_LGG=LegendCard.TwoLinkedGoblins
const LG_LHH=LegendCard.TwoLinkedHumans
const LG_LEE=LegendCard.TwoLinkedElves
const LG_LDD=LegendCard.TwoLinkedDwarfs
const LG_DEGH=LegendCard.FourTribes
const LG_GGH=LegendCard.TwoVsOne_GoblinHuman
const LG_GGE=LegendCard.TwoVsOne_GoblinElf
const LG_GGD=LegendCard.TwoVsOne_GoblinDwarf
const LG_DDE=LegendCard.TwoVsOne_ElfDwarf
const LG_PPP=LegendCard.ThreeLinkedPlains
const LG_SSS=LegendCard.ThreeLinkedSwamps
const LG_MMM=LegendCard.ThreeLinkedMountains
const LG_FFF=LegendCard.ThreeLinkedForests

/**
 * To test specific positions
 *
 * game.new({'test':1})
 */
export class AetheryaTests {
  checkNbPlayers(nbPlayers:number, testId:number){
    let expectedNbPlayers=2
    if (testId>=10 && testId<=12)
      expectedNbPlayers=3
    else if (testId>12 && testId<=16)
      expectedNbPlayers=4

    if (nbPlayers!=expectedNbPlayers){
      console.log("Invalid nb players")
      console.log("Please retry with game.new({'test':"+testId+", 'players':"+expectedNbPlayers+"})")
    }
  }

  setupMaterial(setup: AetheryaSetup, testId:number, nbPlayers:number){
    console.log("Test "+testId)
    this.checkNbPlayers(nbPlayers, testId)

    switch (testId){
      case 1:
        this.setupMaterial1(setup)
        break
      case 2:
        this.setupMaterial2(setup)
        break
      case 3:
        this.setupMaterial3(setup)
        break
      case 4:
        this.setupMaterial4(setup)
        break
      case 5:
        this.setupMaterial5(setup)
        break
      case 6:
        this.setupMaterial6(setup)
        break
      case 7:
        this.setupMaterial7(setup)
        break
      case 8:
        this.setupMaterial8(setup)
        break
      case 9:
        this.setupMaterial9(setup)
        break
      case 10:
        this.setupMaterial10(setup)
        break
      case 11:
        this.setupMaterial11(setup)
        break
      case 12:
        this.setupMaterial12(setup)
        break
      case 13:
        this.setupMaterial13(setup)
        break
      case 14:
        this.setupMaterial14(setup)
        break
      case 15:
        this.setupMaterial15(setup)
        break
      case 16:
        this.setupMaterial16(setup)
        break
      case 17:
        this.setupMaterial17(setup)
        break

      default:
        console.log("*** Unknown test")
    }
  }

  start(setup: AetheryaSetup, testId:number) {
    switch (testId){
      case 1:
        this.start1(setup)
        break
      case 2:
        this.start2(setup)
        break
      case 3:
        this.start3(setup)
        break
      case 4:
        this.start4(setup)
        break
      case 5:
        this.start5(setup)
        break
      case 6:
        this.start6(setup)
        break
      case 7:
        this.start7(setup)
        break
      case 8:
        this.start8(setup)
        break
      case 9:
        this.start9(setup)
        break
      case 10:
        this.start10(setup)
        break
      case 11:
        this.start11(setup)
        break
      case 12:
        this.start12(setup)
        break
      case 13:
        this.start13(setup)
        break
      case 14:
        this.start14(setup)
        break
      case 15:
        this.start15(setup)
        break
      case 16:
        this.start16(setup)
        break
      case 17:
        this.start17(setup)
        break

      default:
        console.log("*** Unknown test")
    }
  }

  texts(purpose:string, todo:string, expected:string){
    console.log("Purpose:  "+purpose)
    console.log("TO DO:    "+todo)
    console.log("Expected: "+expected)
  }

  getLegendCards() {
    return [
      LG_LHE, LG_LHD, LG_LGG, LG_LHH,
      LG_LEE, LG_LDD, LG_DEGH, LG_GGH,
      LG_GGE, LG_GGD, LG_DDE, LG_PPP,
      LG_SSS, LG_MMM, LG_FFF
    ]
  }

  preparePlayerLegendLine(
      setup: AetheryaSetup,
      legendLine:LegendCard[],
      player: number
    ){
    // Get legend cards
    const legendCards=this.getLegendCards()
    let legendDecks={}
    for (let i=0; i<legendCards.length; i++){
      const card=legendCards[i]
      legendDecks[card]=setup
        .material(MaterialType.LegendCard)
        .filter(item => item.id==card)
        .deck()
    }

    // Dispatch legend cards
    for (let i=0; i<legendLine.length; i++){
      const legendCard=legendLine[i]
      legendDecks[legendCard].deal({type:LocationType.PlayerLegendLine, player}, 1)
    }
  }

  prepareBoard_2players(
      setup: AetheryaSetup,
      board1:KingdomCard[][],
      board2:KingdomCard[][],
      board1Visibility:boolean[][],
      board2Visibility:boolean[][],
      legendLine:LegendCard[],
      discard:KingdomCard
    ){
    this.prepareBoard(
      setup,
      board1, board2, undefined, undefined,
      board1Visibility, board2Visibility, undefined, undefined,
      legendLine,
      discard
    )
  }

  prepareBoard_3players(
      setup: AetheryaSetup,
      board1:KingdomCard[][],
      board2:KingdomCard[][],
      board3:KingdomCard[][],
      board1Visibility:boolean[][],
      board2Visibility:boolean[][],
      board3Visibility:boolean[][],
      legendLine:LegendCard[],
      discard:KingdomCard
    ){
    this.prepareBoard(
      setup,
      board1, board2, board3, undefined,
      board1Visibility, board2Visibility, board3Visibility, undefined,
      legendLine,
      discard
    )
  }

  prepareBoard(
      setup: AetheryaSetup,
      board1:KingdomCard[][],
      board2:KingdomCard[][],
      board3:KingdomCard[][]|undefined,
      board4:KingdomCard[][]|undefined,
      board1Visibility:boolean[][],
      board2Visibility:boolean[][],
      board3Visibility:boolean[][]|undefined,
      board4Visibility:boolean[][]|undefined,
      legendLine:LegendCard[],
      discard:KingdomCard
    ){
    // Prepare decks of specific cards
    const kingdomCards=[P, F, M, S, H, E, N, G, D, L]
    const legendCards=this.getLegendCards()

    let kingdomDecks={}
    for (let i=0; i<kingdomCards.length; i++){
      const card=kingdomCards[i]
      kingdomDecks[card]=setup
        .material(MaterialType.KingdomCard)
        .filter(item => item.id==card)
        .deck()
    }

    let legendDecks={}
    for (let i=0; i<legendCards.length; i++){
      const card=legendCards[i]
      legendDecks[card]=setup
        .material(MaterialType.LegendCard)
        .filter(item => item.id==card)
        .deck()
    }

    // Fill board 1
    for (let y=0; y<4; y++){
      const row=board1[y]
      const visibilityRow=board1Visibility[y]
      for (let x=0; x<4; x++){
        const card=row[x]
        const visible=visibilityRow[x]
        kingdomDecks[card].deal({type:LocationType.PlayerBoard, player:1, x:x+1, y:y+1, rotation:visible}, 1)
      }
    }

    // Fill board 2
    for (let y=0; y<4; y++){
      const row=board2[y]
      const visibilityRow=board2Visibility[y]
      for (let x=0; x<4; x++){
        const card=row[x]
        const visible=visibilityRow[x]
        kingdomDecks[card].deal({type:LocationType.PlayerBoard, player:2, x:x+1, y:y+1, rotation:visible}, 1)
      }
    }

    // Fill board 3
    if (board3!==undefined){
      for (let y=0; y<4; y++){
        const row=board3[y]
        const visibilityRow=board3Visibility![y]
        for (let x=0; x<4; x++){
          const card=row[x]
          const visible=visibilityRow[x]
          kingdomDecks[card].deal({type:LocationType.PlayerBoard, player:3, x:x+1, y:y+1, rotation:visible}, 1)
        }
      }
    }

    // Fill board 4
    if (board4!==undefined){
      for (let y=0; y<4; y++){
        const row=board4[y]
        const visibilityRow=board4Visibility![y]
        for (let x=0; x<4; x++){
          const card=row[x]
          const visible=visibilityRow[x]
          kingdomDecks[card].deal({type:LocationType.PlayerBoard, player:4, x:x+1, y:y+1, rotation:visible}, 1)
        }
      }
    }

    // Fill legend line
    for (let i=0; i<legendLine.length; i++){
      const legendCard=legendLine[i]
      legendDecks[legendCard].deal({type:LocationType.LegendLine}, 1)
    }

    // Fill discard
    kingdomDecks[discard].deal({type:LocationType.KingdomDiscard}, 1)
  }

  // Test 1 - Trigger scoring AFTER revealing a card
  setupMaterial1_inner(setup: AetheryaSetup) {
    const board1 = [
      [G, S, E, F],
      [S, L, M, D],
      [H, M, N, F],
      [P, H, D, P]
    ]
    const board1Visibility= [
      [true, true,  true,  true],
      [true, true,  true,  true],
      [true, true,  true,  false],
      [true, true,  true,  true]
    ]
    const board2 = [
      [G, D, E, M],
      [L, S, G, P],
      [S, H, F, E],
      [L, M, P, N]
    ]
    const board2Visibility= [
      [false, false, false, false],
      [false, true,  true,  false],
      [false, true,  true,  false],
      [false, false, false, false]
    ]
    const legendLine:LegendCard[]=[LG_LHE, LG_FFF, LG_LHH, LG_GGH, LG_LDD, LG_PPP, LG_GGD, LG_LHD]

    this.prepareBoard_2players(setup, board1, board2, board1Visibility, board2Visibility, legendLine, F)
  }
  setupMaterial1(setup: AetheryaSetup) {
    this.texts(
      "Trigger scoring AFTER revealing a card",
      "Click on the hidden board card",
      "Scoring is triggered immediately"
    )
    this.setupMaterial1_inner(setup)
  }
  start1(setup: AetheryaSetup) {
    setup.startPlayerTurn(RuleId.PlaceDiscardCard, 1)
  }

  // Test 2 - Trigger scoring AFTER placing a card
  setupMaterial2(setup: AetheryaSetup) {
    this.texts(
      "Trigger scoring AFTER placing a card",
      "Move the discard card over the hidden board card",
      "Scoring is triggered immediately"
    )
    this.setupMaterial1_inner(setup)
  }
  start2(setup: AetheryaSetup) {
    setup.startPlayerTurn(RuleId.DrawOrPlaceDiscardCard, 1)
  }

  // Test 3 - 2 available legend cards
  // pick 1 and only 1 - before or after placing a card
  setupMaterial3(setup: AetheryaSetup) {
    this.texts(
      "2 available legend cards - Only one may be picked by turn",
      "Pick a card",
      "No other legend card may be picked until next turn, including after moving a card to the board or revealing a board card"
    )

    const board1 = [
      [G, S, E, F],
      [S, L, M, D],
      [H, H, N, F],
      [P, M, D, P]
    ]
    const board1Visibility= [
      [true, true,  true,  true],
      [true, true,  true,  true],
      [true, true,  true,  false],
      [true, true,  true,  true]
    ]
    const board2 = [
      [G, D, E, M],
      [L, S, G, P],
      [S, H, F, E],
      [L, M, P, N]
    ]
    const board2Visibility= [
      [false, false, false, false],
      [false, true,  true,  false],
      [false, true,  true,  false],
      [false, false, false, false]
    ]
    const legendLine:LegendCard[]=[LG_LHE, LG_FFF, LG_LHH, LG_GGH, LG_LDD, LG_PPP, LG_GGD, LG_LHD]

    this.prepareBoard_2players(setup, board1, board2, board1Visibility, board2Visibility, legendLine, F)
  }
  start3(setup: AetheryaSetup) {
    setup.startPlayerTurn(RuleId.DrawOrPlaceDiscardCard, 1)
  }

  // Test 4 - 1 legend card available AFTER placing a card
  setupMaterial4(setup: AetheryaSetup) {
    this.texts(
      "1 available legend card AFTER placing a card",
      "Move the human card to the bottom left corner of the board - over the hidden card",
      "A legend card may be picked"
    )

    const board1 = [
      [G, S, E, F],
      [S, L, M, D],
      [H, M, N, F],
      [P, F, D, P]
    ]
    const board1Visibility= [
      [true, true,  true,  true],
      [true, true,  true,  true],
      [true, true,  true,  false],
      [false, true,  true,  true]
    ]
    const board2 = [
      [G, D, E, M],
      [L, S, G, P],
      [S, M, F, E],
      [L, H, P, N]
    ]
    const board2Visibility= [
      [false, false, false, false],
      [false, true,  true,  false],
      [false, true,  true,  false],
      [false, false, false, false]
    ]
    const legendLine:LegendCard[]=[LG_LHE, LG_FFF, LG_LHH, LG_GGH, LG_LDD, LG_PPP, LG_GGD, LG_LHD]

    this.prepareBoard_2players(setup, board1, board2, board1Visibility, board2Visibility, legendLine, H)
  }
  start4(setup: AetheryaSetup) {
    setup.startPlayerTurn(RuleId.DrawOrPlaceDiscardCard, 1)
  }

  // Test 5 - 1 legend card available AFTER revealing a card
  setupMaterial5(setup: AetheryaSetup) {
    this.texts(
      "1 available legend card AFTER revealing a card",
      "Reveal the card at the bottom left corner of the board",
      "A legend card may be picked"
    )

    const board1 = [
      [G, S, E, F],
      [S, L, M, D],
      [H, M, N, F],
      [H, F, D, P]
    ]
    const board1Visibility= [
      [true, true,  true,  true],
      [true, true,  true,  true],
      [true, true,  true,  false],
      [false, true,  true,  true]
    ]
    const board2 = [
      [G, D, E, M],
      [L, S, G, P],
      [S, M, F, E],
      [L, H, P, N]
    ]
    const board2Visibility= [
      [false, false, false, false],
      [false, true,  true,  false],
      [false, true,  true,  false],
      [false, false, false, false]
    ]
    const legendLine:LegendCard[]=[LG_LHE, LG_FFF, LG_LHH, LG_GGH, LG_LDD, LG_PPP, LG_GGD, LG_LHD]

    this.prepareBoard_2players(setup, board1, board2, board1Visibility, board2Visibility, legendLine, P)
  }
  start5(setup: AetheryaSetup) {
    setup.startPlayerTurn(RuleId.PlaceDiscardCard, 1)
  }

  // Test 6 - No legend card after revealing the last board card
  setupMaterial6(setup: AetheryaSetup) {
    this.texts(
      "No legend card may be picked after revealing the last board card",
      "Reveal the last board card",
      "A legend card condition is triggered. No legend card may be picked. The scoring is triggered immediately."
    )

    const board1 = [
      [G, S, E, F],
      [S, L, M, D],
      [H, M, N, F],
      [H, F, D, P]
    ]
    const board1Visibility= [
      [true, true,  true,  true],
      [true, true,  true,  true],
      [true, true,  true,  true],
      [false, true,  true,  true]
    ]
    const board2 = [
      [G, D, E, M],
      [L, S, G, P],
      [S, M, F, E],
      [L, H, P, N]
    ]
    const board2Visibility= [
      [false, false, false, false],
      [false, true,  true,  false],
      [false, true,  true,  false],
      [false, false, false, false]
    ]
    const legendLine:LegendCard[]=[LG_LHE, LG_FFF, LG_LHH, LG_GGH, LG_LDD, LG_PPP, LG_GGD, LG_LHD]

    this.prepareBoard_2players(setup, board1, board2, board1Visibility, board2Visibility, legendLine, P)
  }
  start6(setup: AetheryaSetup) {
    setup.startPlayerTurn(RuleId.PlaceDiscardCard, 1)
  }

  // Test 7 - No legend card after moving a card over the last hidden board card
  setupMaterial7(setup: AetheryaSetup) {
    this.texts(
      "No legend card may be picked after revealing the last board card",
      "Move the human over the last hidden board card",
      "A legend card condition is triggered. No legend card may be picked. The scoring is triggered immediately."
    )

    const board1 = [
      [G, S, E, F],
      [S, L, M, D],
      [H, M, N, F],
      [P, F, D, P]
    ]
    const board1Visibility= [
      [true, true,  true,  true],
      [true, true,  true,  true],
      [true, true,  true,  true],
      [false, true,  true,  true]
    ]
    const board2 = [
      [G, D, E, M],
      [L, S, G, P],
      [S, M, F, E],
      [L, H, P, N]
    ]
    const board2Visibility= [
      [false, false, false, false],
      [false, true,  true,  false],
      [false, true,  true,  false],
      [false, false, false, false]
    ]
    const legendLine:LegendCard[]=[LG_LHE, LG_FFF, LG_LHH, LG_GGH, LG_LDD, LG_PPP, LG_GGD, LG_LHD]

    this.prepareBoard_2players(setup, board1, board2, board1Visibility, board2Visibility, legendLine, H)
  }
  start7(setup: AetheryaSetup) {
    setup.startPlayerTurn(RuleId.DrawOrPlaceDiscardCard, 1)
  }

  basicBoard() {
    return [
      [G, S, E, F],
      [S, L, M, D],
      [H, M, N, H],
      [P, F, D, P]
    ]
  }
  basicVisibility() {
    return [
      [false, false, false, false],
      [false, true,  true,  false],
      [false, true,  true,  false],
      [false, false, false, false],
    ]
  }

  basicSetup2Players(setup: AetheryaSetup){
    const board1=this.basicBoard()
    const board2=this.basicBoard()
    const board1Visibility=this.basicVisibility()
    const board2Visibility=this.basicVisibility()
    const legendLine:LegendCard[]=[]
    this.prepareBoard_2players(setup, board1, board2, board1Visibility, board2Visibility, legendLine, H)
  }

  basicSetup3Players(setup: AetheryaSetup){
    const board1=this.basicBoard()
    const board2=this.basicBoard()
    const board3=this.basicBoard()
    const board1Visibility=this.basicVisibility()
    const board2Visibility=this.basicVisibility()
    const board3Visibility=this.basicVisibility()
    const legendLine:LegendCard[]=[]
    this.prepareBoard_3players(setup, board1, board2, board3, board1Visibility, board2Visibility, board3Visibility, legendLine, H)
  }

  basicSetup4Players(setup: AetheryaSetup){
    const board1=this.basicBoard()
    const board2=this.basicBoard()
    const board3=this.basicBoard()
    const board4=this.basicBoard()
    const board1Visibility=this.basicVisibility()
    const board2Visibility=this.basicVisibility()
    const board3Visibility=this.basicVisibility()
    const board4Visibility=this.basicVisibility()
    const legendLine:LegendCard[]=[]
    this.prepareBoard(
      setup,
      board1, board2, board3, board4,
      board1Visibility,
      board2Visibility,
      board3Visibility,
      board4Visibility,
      legendLine,
      H)
  }

  // Test 8 - 2 players mode - All legend cards to player 1
  setupMaterial8(setup: AetheryaSetup) {
    this.texts(
      "2 players mode - All legend cards to player 1",
      "Check no card overlap",
      "No card overlap"
    )
    this.basicSetup2Players(setup)
    this.preparePlayerLegendLine(setup, this.getLegendCards(), 1)
  }
  start8(setup: AetheryaSetup) {
    setup.startPlayerTurn(RuleId.DrawOrPlaceDiscardCard, 1)
  }

  // Test 9 - 2 players mode - All legend cards to player 1
  setupMaterial9(setup: AetheryaSetup) {
    this.texts(
      "2 players mode - All legend cards to player 2",
      "Check no card overlap",
      "No card overlap"
    )
    this.basicSetup2Players(setup)
    this.preparePlayerLegendLine(setup, this.getLegendCards(), 2)
  }
  start9(setup: AetheryaSetup) {
    setup.startPlayerTurn(RuleId.DrawOrPlaceDiscardCard, 1)
  }

  // Test 10 - 3 players mode - All legend cards to player 1
  setupMaterial10(setup: AetheryaSetup) {
    this.texts(
      "3 players mode - All legend cards to player 1",
      "Check no card overlap",
      "No card overlap"
    )
    this.basicSetup3Players(setup)
    this.preparePlayerLegendLine(setup, this.getLegendCards(), 1)
  }
  start10(setup: AetheryaSetup) {
    setup.startPlayerTurn(RuleId.DrawOrPlaceDiscardCard, 1)
  }

  // Test 11 - 3 players mode - All legend cards to player 2
  setupMaterial11(setup: AetheryaSetup) {
    this.texts(
      "3 players mode - All legend cards to player 2",
      "Check no card overlap",
      "No card overlap"
    )
    this.basicSetup3Players(setup)
    this.preparePlayerLegendLine(setup, this.getLegendCards(), 2)
  }
  start11(setup: AetheryaSetup) {
    setup.startPlayerTurn(RuleId.DrawOrPlaceDiscardCard, 1)
  }

  // Test 12 - 3 players mode - All legend cards to player 3
  setupMaterial12(setup: AetheryaSetup) {
    this.texts(
      "3 players mode - All legend cards to player 3",
      "Check no card overlap",
      "No card overlap"
    )
    this.basicSetup3Players(setup)
    this.preparePlayerLegendLine(setup, this.getLegendCards(), 3)
  }
  start12(setup: AetheryaSetup) {
    setup.startPlayerTurn(RuleId.DrawOrPlaceDiscardCard, 1)
  }

  // Test 13 - 4 players mode - All legend cards to player 1
  setupMaterial13(setup: AetheryaSetup) {
    this.texts(
      "4 players mode - All legend cards to player 1",
      "Check no card overlap",
      "No card overlap"
    )
    this.basicSetup4Players(setup)
    this.preparePlayerLegendLine(setup, this.getLegendCards(), 1)
  }
  start13(setup: AetheryaSetup) {
    setup.startPlayerTurn(RuleId.DrawOrPlaceDiscardCard, 1)
  }

  // Test 14 - 4 players mode - All legend cards to player 2
  setupMaterial14(setup: AetheryaSetup) {
    this.texts(
      "4 players mode - All legend cards to player 2",
      "Check no card overlap",
      "No card overlap"
    )
    this.basicSetup4Players(setup)
    this.preparePlayerLegendLine(setup, this.getLegendCards(), 2)
  }
  start14(setup: AetheryaSetup) {
    setup.startPlayerTurn(RuleId.DrawOrPlaceDiscardCard, 1)
  }

  // Test 15 - 4 players mode - All legend cards to player 3
  setupMaterial15(setup: AetheryaSetup) {
    this.texts(
      "4 players mode - All legend cards to player 3",
      "Check no card overlap",
      "No card overlap"
    )
    this.basicSetup4Players(setup)
    this.preparePlayerLegendLine(setup, this.getLegendCards(), 3)
  }
  start15(setup: AetheryaSetup) {
    setup.startPlayerTurn(RuleId.DrawOrPlaceDiscardCard, 1)
  }

  // Test 16 - 4 players mode - All legend cards to player 4
  setupMaterial16(setup: AetheryaSetup) {
    this.texts(
      "4 players mode - All legend cards to player 4",
      "Check no card overlap",
      "No card overlap"
    )
    this.basicSetup4Players(setup)
    this.preparePlayerLegendLine(setup, this.getLegendCards(), 4)
  }
  start16(setup: AetheryaSetup) {
    setup.startPlayerTurn(RuleId.DrawOrPlaceDiscardCard, 1)
  }

  // Test 17 - Tie break
  setupMaterial17(setup: AetheryaSetup) {
    this.texts(
      "Tie break",
      "Nothing to do",
      "First player must win thanks to the higher subtotal (18 points for dragons)"
    )

    const board1=[
      [H, N, M, N],
      [H, D, N, M],
      [D, H, L, G],
      [H, D, S, G]
    ]
    const board2=[
      [M, D, E, F],
      [M, E, F, G],
      [P, F, G, S],
      [P, P, S, L]
    ]
    const board1Visibility=this.basicVisibility()
    const board2Visibility=this.basicVisibility()
    const legendLine:LegendCard[]=[]
    this.prepareBoard_2players(setup, board1, board2, board1Visibility, board2Visibility, legendLine, H)

    this.preparePlayerLegendLine(setup, [LG_LHE, LG_LHD], 1)
    this.preparePlayerLegendLine(setup, [LG_DDE, LG_GGD, LG_PPP], 2)
  }
  start17(setup: AetheryaSetup) {
    setup.startRule(RuleId.RevealAllBoardCards)
  }
}

export const tests = new AetheryaTests()
