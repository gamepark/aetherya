import { KingdomCard } from '../material/KingdomCard'
import { LegendCard } from '../material/LegendCard'
import { score } from './Score'

const enableTests = false
//const enableTests = true

export class UnitTests {
  run(){
    if (!enableTests)
      return

    console.log('Tests')
    this.test1();
    this.test2();
    this.test3();
    this.test4();
    this.test5();
    this.test6();
    this.test7();
    this.test8();
    this.test9();
    this.test10();
    this.test11();
  }

  toGrid(
    a1:KingdomCard, b1:KingdomCard, c1:KingdomCard, d1:KingdomCard,
    a2:KingdomCard, b2:KingdomCard, c2:KingdomCard, d2:KingdomCard,
    a3:KingdomCard, b3:KingdomCard, c3:KingdomCard, d3:KingdomCard,
    a4:KingdomCard, b4:KingdomCard, c4:KingdomCard, d4:KingdomCard
  ){
    return [[a1,b1,c1,d1],[a2,b2,c2,d2],[a3,b3,c3,d3],[a4,b4,c4,d4]]
  }

  checkScore(boardCards:KingdomCard[][],
    allLegendCardIds:LegendCard[],
    expectedElfPoints:number,
    expectedDwarfPoints:number,
    expectedHumanPoints:number,
    expectedGoblinPoints:number,
    expectedDragonPoints:number,
    expectedLegendPoints:number,
    expectedConflictPoints:number,
    expectedTotal:number){
    let playerScore = score.detailedPlayerScoreFromGrid(boardCards, allLegendCardIds)
    let ok = true

    if (playerScore.elfPoints != expectedElfPoints){ ok = false; console.log('Elf points error')}
    if (playerScore.dwarfPoints != expectedDwarfPoints){ ok = false; console.log('Dwarf points error')}
    if (playerScore.humanPoints != expectedHumanPoints){ ok = false; console.log('Human points error')}
    if (playerScore.goblinPoints != expectedGoblinPoints){ ok = false; console.log('Goblin points error')}
    if (playerScore.dragonPoints != expectedDragonPoints){ ok = false; console.log('Dragon points error')}
    if (playerScore.legendPoints != expectedLegendPoints){ ok = false; console.log('Legend points error')}
    if (playerScore.conflictPoints != expectedConflictPoints){ ok = false; console.log('Conflict points error')}
    if (playerScore.total != expectedTotal){ ok = false; console.log('Total points error')}

    return ok
  }

  test1(){
    console.log('test 1 - No points')
    let board=this.toGrid(
      KingdomCard.Plain, KingdomCard.Plain, KingdomCard.Plain, KingdomCard.Plain,
      KingdomCard.Plain, KingdomCard.Plain, KingdomCard.Plain, KingdomCard.Plain,
      KingdomCard.Plain, KingdomCard.Plain, KingdomCard.Plain, KingdomCard.Plain,
      KingdomCard.Plain, KingdomCard.Plain, KingdomCard.Plain, KingdomCard.Plain
    )
    let legends:LegendCard[]=[]
    if (!this.checkScore(board, legends, 0, 0, 0, 0, 0, 0, 0, 0)){ console.log('*** ERROR ***') } else { console.log("OK") }
  }

  test2(){
    console.log('test 2 - Tribes and lands')
    let board=this.toGrid(
      KingdomCard.Goblin, KingdomCard.Swamp,    KingdomCard.Elf,   KingdomCard.Forest,
      KingdomCard.Swamp,  KingdomCard.Plain,    KingdomCard.Plain, KingdomCard.Plain,
      KingdomCard.Human,  KingdomCard.Mountain, KingdomCard.Dwarf, KingdomCard.Forest,
      KingdomCard.Plain,  KingdomCard.Plain,    KingdomCard.Swamp, KingdomCard.Plain
    )
    let legends:LegendCard[]=[]
    if (!this.checkScore(board, legends, 1, 2, 2, 6, 0, 0, 0, 11)){ console.log('*** ERROR ***') } else { console.log("OK") }
  }

  test3(){
    console.log('test 3 - Conflicts')
    let board=this.toGrid(
      KingdomCard.Goblin, KingdomCard.Human,    KingdomCard.Elf,   KingdomCard.Dwarf,
      KingdomCard.Dwarf,  KingdomCard.Human,    KingdomCard.Dwarf, KingdomCard.Dwarf,
      KingdomCard.Goblin,  KingdomCard.Elf,     KingdomCard.Plain, KingdomCard.Plain,
      KingdomCard.Goblin,  KingdomCard.Goblin,  KingdomCard.Plain, KingdomCard.Plain
    )
    let legends:LegendCard[]=[]
    if (!this.checkScore(board, legends, 0, 0, 0, 0, 0, 0, -14, -14)){ console.log('*** ERROR ***') } else { console.log("OK") }
  }

  test4(){
    console.log('test 4 - Single non-domesticated dragon')
    let board=this.toGrid(
      KingdomCard.Plain, KingdomCard.Plain, KingdomCard.Plain, KingdomCard.Plain,
      KingdomCard.Plain, KingdomCard.Dragon, KingdomCard.Plain, KingdomCard.Plain,
      KingdomCard.Plain, KingdomCard.Plain, KingdomCard.Plain, KingdomCard.Plain,
      KingdomCard.Plain, KingdomCard.Plain, KingdomCard.Plain, KingdomCard.Plain
    )
    let legends:LegendCard[]=[]
    if (!this.checkScore(board, legends, 0, 0, 0, 0, -3, 0, 0, -3)){ console.log('*** ERROR ***') } else { console.log("OK") }
  }

  test5(){
    console.log('test 5 - 2 non-domesticated dragons')
    let board=this.toGrid(
      KingdomCard.Plain, KingdomCard.Plain, KingdomCard.Plain, KingdomCard.Plain,
      KingdomCard.Plain, KingdomCard.Dragon, KingdomCard.Plain, KingdomCard.Plain,
      KingdomCard.Plain, KingdomCard.Plain, KingdomCard.Plain, KingdomCard.Plain,
      KingdomCard.Dragon, KingdomCard.Plain, KingdomCard.Plain, KingdomCard.Plain
    )
    let legends:LegendCard[]=[]
    if (!this.checkScore(board, legends, 0, 0, 0, 0, -10, 0, 0, -10)){ console.log('*** ERROR ***') } else { console.log("OK") }
  }

  test6(){
    console.log('test 6 - 3 non-domesticated dragons')
    let board=this.toGrid(
      KingdomCard.Plain, KingdomCard.Plain, KingdomCard.Dragon, KingdomCard.Plain,
      KingdomCard.Plain, KingdomCard.Dragon, KingdomCard.Plain, KingdomCard.Plain,
      KingdomCard.Plain, KingdomCard.Plain, KingdomCard.Plain, KingdomCard.Plain,
      KingdomCard.Dragon, KingdomCard.Plain, KingdomCard.Plain, KingdomCard.Plain
    )
    let legends:LegendCard[]=[]
    if (!this.checkScore(board, legends, 0, 0, 0, 0, -18, 0, 0, -18)){ console.log('*** ERROR ***') } else { console.log("OK") }
  }

  test7(){
    console.log('test 7 - 4 non-domesticated dragons')
    let board=this.toGrid(
      KingdomCard.Plain, KingdomCard.Plain, KingdomCard.Dragon, KingdomCard.Plain,
      KingdomCard.Plain, KingdomCard.Dragon, KingdomCard.Plain, KingdomCard.Plain,
      KingdomCard.Plain, KingdomCard.Plain, KingdomCard.Dragon, KingdomCard.Plain,
      KingdomCard.Dragon, KingdomCard.Plain, KingdomCard.Plain, KingdomCard.Plain
    )
    let legends:LegendCard[]=[]
    if (!this.checkScore(board, legends, 0, 0, 0, 0, -24, 0, 0, -24)){ console.log('*** ERROR ***') } else { console.log("OK") }
  }

  test8(){
    console.log('test 8 - Single domesticated dragon')
    let board=this.toGrid(
      KingdomCard.Plain, KingdomCard.Human, KingdomCard.Plain, KingdomCard.Plain,
      KingdomCard.Plain, KingdomCard.Dragon, KingdomCard.Plain, KingdomCard.Plain,
      KingdomCard.Plain, KingdomCard.Human, KingdomCard.Plain, KingdomCard.Plain,
      KingdomCard.Plain, KingdomCard.Plain, KingdomCard.Plain, KingdomCard.Plain
    )
    let legends:LegendCard[]=[]
    if (!this.checkScore(board, legends, 0, 0, 10, 0, 3, 0, 0, 13)){ console.log('*** ERROR ***') } else { console.log("OK") }
  }

  test9(){
    console.log('test 9 - 2 domesticated dragons')
    let board=this.toGrid(
      KingdomCard.Plain, KingdomCard.Elf, KingdomCard.Plain, KingdomCard.Plain,
      KingdomCard.Plain, KingdomCard.Dragon, KingdomCard.Elf, KingdomCard.Plain,
      KingdomCard.Dwarf, KingdomCard.Plain, KingdomCard.Plain, KingdomCard.Plain,
      KingdomCard.Dragon, KingdomCard.Dwarf, KingdomCard.Plain, KingdomCard.Plain
    )
    let legends:LegendCard[]=[]
    if (!this.checkScore(board, legends, 0, 0, 0, 0, 10, 0, 0, 10)){ console.log('*** ERROR ***') } else { console.log("OK") }
  }

  test10(){
    console.log('test 10 - 3 domesticated dragons')
    let board=this.toGrid(
      KingdomCard.Plain, KingdomCard.Elf, KingdomCard.Dragon, KingdomCard.Elf,
      KingdomCard.Elf, KingdomCard.Dragon, KingdomCard.Plain, KingdomCard.Plain,
      KingdomCard.Elf, KingdomCard.Elf, KingdomCard.Plain, KingdomCard.Plain,
      KingdomCard.Dragon, KingdomCard.Elf, KingdomCard.Plain, KingdomCard.Plain
    )
    let legends:LegendCard[]=[]
    if (!this.checkScore(board, legends, 0, 0, 0, 0, 18, 0, 0, 18)){ console.log('*** ERROR ***') } else { console.log("OK") }
  }

  test11(){
    console.log('test 11 - 4 impossible to domesticate dragons')
    let board=this.toGrid(
      KingdomCard.Elf, KingdomCard.Elf, KingdomCard.Dragon, KingdomCard.Elf,
      KingdomCard.Elf, KingdomCard.Dragon, KingdomCard.Elf, KingdomCard.Elf,
      KingdomCard.Elf, KingdomCard.Elf, KingdomCard.Dragon, KingdomCard.Elf,
      KingdomCard.Dragon, KingdomCard.Elf, KingdomCard.Elf, KingdomCard.Elf
    )
    let legends:LegendCard[]=[]
    if (!this.checkScore(board, legends, 0, 0, 0, 0, -24, 0, 0, -24)){ console.log('*** ERROR ***') } else { console.log("OK") }
  }

  // TODO - Portal tests
}

export const unitTests = new UnitTests()
