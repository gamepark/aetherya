import { Material } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { KingdomCard } from '../material/KingdomCard'
import { LegendCard } from '../material/LegendCard'

export class PlayerScore {
  elfPoints:number
  dwarfPoints:number
  humanPoints:number
  goblinPoints:number
  dragonPoints:number
  legendPoints:number
  conflictPoints:number
  total:number

  constructor(
    elfPoints:number,
    dwarfPoints:number,
    humanPoints:number,
    goblinPoints:number,
    dragonPoints:number,
    legendPoints:number,
    conflictPoints:number){
    this.elfPoints=elfPoints
    this.dwarfPoints=dwarfPoints
    this.humanPoints=humanPoints
    this.goblinPoints=goblinPoints
    this.dragonPoints=dragonPoints
    this.legendPoints=legendPoints
    this.conflictPoints=conflictPoints
    this.total=elfPoints+dwarfPoints+humanPoints+goblinPoints+dragonPoints+legendPoints+conflictPoints
  }
}

export class LegendCharacteristics {
  has2connectedElves:boolean
  has2connectedDwarfs:boolean
  has2connectedHumans:boolean
  has2connectedGoblins:boolean

  has3connectedForests:boolean
  has3connectedMountains:boolean
  has3connectedPlains:boolean
  has3connectedSwamps:boolean

  hasAllTribes:boolean

  hasConnectedHumanDwarf:boolean
  hasConnectedHumanElf:boolean

  has2vs1_goblinElf:boolean
  has2vs1_goblinDwarf:boolean
  has2vs1_goblinHuman:boolean
  has2vs1_dwarfElf:boolean

  match(type:LegendCard) : boolean {
    if (type==LegendCard.LinkedHumanElf)
      return this.hasConnectedHumanElf
    if (type==LegendCard.LinkedHumanDwarf)
      return this.hasConnectedHumanDwarf
    if (type==LegendCard.TwoLinkedGoblins)
      return this.has2connectedGoblins
    if (type==LegendCard.TwoLinkedHumans)
      return this.has2connectedHumans
    if (type==LegendCard.TwoLinkedElves)
      return this.has2connectedElves
    if (type==LegendCard.TwoLinkedDwarfs)
      return this.has2connectedDwarfs
    if (type==LegendCard.FourTribes)
      return this.hasAllTribes
    if (type==LegendCard.TwoVsOne_GoblinHuman)
      return this.has2vs1_goblinHuman
    if (type==LegendCard.TwoVsOne_GoblinElf)
      return this.has2vs1_goblinElf
    if (type==LegendCard.TwoVsOne_GoblinDwarf)
      return this.has2vs1_goblinDwarf
    if (type==LegendCard.TwoVsOne_ElfDwarf)
      return this.has2vs1_dwarfElf
    if (type==LegendCard.ThreeLinkedPlains)
      return this.has3connectedPlains
    if (type==LegendCard.ThreeLinkedSwamps)
      return this.has3connectedSwamps
    if (type==LegendCard.ThreeLinkedMountains)
      return this.has3connectedMountains
    if (type==LegendCard.ThreeLinkedForests)
      return this.has3connectedForests

    console.log("*** ERROR - Unsupported legend card")
    return false
  }

  constructor(
    has2connectedElves:boolean,
    has2connectedDwarfs:boolean,
    has2connectedHumans:boolean,
    has2connectedGoblins:boolean,
    has3connectedForests:boolean,
    has3connectedMountains:boolean,
    has3connectedPlains:boolean,
    has3connectedSwamps:boolean,
    hasAllTribes:boolean,
    hasConnectedHumanDwarf:boolean,
    hasConnectedHumanElf:boolean,
    has2vs1_goblinElf:boolean,
    has2vs1_goblinDwarf:boolean,
    has2vs1_goblinHuman:boolean,
    has2vs1_dwarfElf:boolean){
    this.has2connectedElves=has2connectedElves
    this.has2connectedDwarfs=has2connectedDwarfs
    this.has2connectedHumans=has2connectedHumans
    this.has2connectedGoblins=has2connectedGoblins
    this.has3connectedForests=has3connectedForests
    this.has3connectedMountains=has3connectedMountains
    this.has3connectedPlains=has3connectedPlains
    this.has3connectedSwamps=has3connectedSwamps
    this.hasAllTribes=hasAllTribes
    this.hasConnectedHumanDwarf=hasConnectedHumanDwarf
    this.hasConnectedHumanElf=hasConnectedHumanElf
    this.has2vs1_goblinElf=has2vs1_goblinElf
    this.has2vs1_goblinDwarf=has2vs1_goblinDwarf
    this.has2vs1_goblinHuman=has2vs1_goblinHuman
    this.has2vs1_dwarfElf=has2vs1_dwarfElf
  }
}

export class GridCoord {
  x:number
  y:number

  constructor(x:number, y:number){
    this.x=x
    this.y=y
  }
}

export class GridCoordSet {
  items:GridCoord[]

  constructor(){
    this.items=[]
  }

  forEach(func: (item: GridCoord) => void){
    this.items.forEach(item => func(item))
  }

  add(coord: GridCoord){
    if (!this.has(coord)){
      this.items.push(coord)
    }
  }

  has(coord: GridCoord):boolean {
    let nbItems=this.items.length
    for (let i=0; i<nbItems; i++){
      let item=this.items[i]
      if (item.x==coord.x && item.y==coord.y)
        return true
    }
    return false
  }
}

export class Score {
  playerScore(player:number,
    allKingdomCards:Material<number, MaterialType, LocationType>,
    allLegendCards:Material<number, MaterialType, LocationType>) : number {
    let detailedScore=this.detailedPlayerScore(player, allKingdomCards, allLegendCards)
    return detailedScore.total
  }

  setGrid(grid:KingdomCard[][], locationX:number, locationY:number, cardId:KingdomCard) {
    grid[locationY-1][locationX-1]=cardId
  }

  toGrid(player:number,
    allKingdomCards:Material<number, MaterialType, LocationType>):KingdomCard[][]{

    let board=allKingdomCards.location(LocationType.PlayerBoard)
      .player(player)

    let boardCards:number[][]=[[-1,-1,-1,-1],[-1,-1,-1,-1],[-1,-1,-1,-1],[-1,-1,-1,-1]]
    let items=board.getItems()
    for (let i=0; i<items.length; i++){
      let item=items[i]
      this.setGrid(boardCards, item.location.x!, item.location.y!, item.id)
    }

    return boardCards
  }

  detailedPlayerScore(player:number,
    allKingdomCards:Material<number, MaterialType, LocationType>,
    allLegendCards:Material<number, MaterialType, LocationType>) : PlayerScore {
    // Aggregate kingdom card ids into a 4x4 array
    let boardCards=this.toGrid(player, allKingdomCards)

    let allLegendCardIds:LegendCard[]=[]

    allLegendCards.location(LocationType.PlayerLegendLine)
      .player(player)
      .getItems().forEach(item => {
        allLegendCardIds.push(item.id)
      })

//      legendPoints+=this.legendCardValue(item.id)
    return this.detailedPlayerScoreFromGrid(boardCards, allLegendCardIds)
  }

  detailedPlayerScoreFromGrid(boardCards:KingdomCard[][],
    allLegendCardIds:LegendCard[]) : PlayerScore {

    // Score for each cards
    let elfPoints=0
    let dwarfPoints=0
    let humanPoints=0
    let goblinPoints=0
    let conflictPoints=0

    let nbDragons=0
    let nbDomesticatedDragons=0

    for (let i=0; i<4; i++){
      for (let j=0; j<4; j++){
        let currentCard=boardCards[i][j]
        if (currentCard === undefined){
          // Undefined card - No points
        } else if (currentCard==KingdomCard.Plain ||
          currentCard==KingdomCard.Swamp ||
          currentCard==KingdomCard.Mountain ||
          currentCard==KingdomCard.Forest){
          // No points for lands
        } else if (currentCard==KingdomCard.Goblin){
          // Conflicts
          this.getAdjacentCardsIncludingPortals(i, j, boardCards).forEach(coord => {
            let adjacentCardType=boardCards[coord.x][coord.y]
            if (adjacentCardType==KingdomCard.Human ||
              adjacentCardType==KingdomCard.Elf ||
              adjacentCardType==KingdomCard.Dwarf){
              conflictPoints+=1
            }
          })

          // Lands
          this.getDirectlyAdjacentCards(i, j).forEach(coord => {
            let adjacentCardType=boardCards[coord.x][coord.y]
            if (adjacentCardType==KingdomCard.Swamp){
              goblinPoints+=3
            }
          })
        } else if (currentCard==KingdomCard.Human){
          this.getAdjacentCardsIncludingPortals(i, j, boardCards).forEach(coord => {
            let adjacentCardType=boardCards[coord.x][coord.y]

            // Lands and conflicts
            if (adjacentCardType==KingdomCard.Plain){
              humanPoints+=2
            } else if (adjacentCardType==KingdomCard.Mountain){
              humanPoints+=1
            } else if (adjacentCardType==KingdomCard.Forest){
              humanPoints+=1
            } else if (adjacentCardType==KingdomCard.Swamp){
              humanPoints-=1
            } else if (adjacentCardType==KingdomCard.Goblin){
              conflictPoints+=1
            }
          })
        } else if (currentCard==KingdomCard.Elf){
          // Lands and conflicts
          this.getAdjacentCardsIncludingPortals(i, j, boardCards).forEach(coord => {
            let adjacentCardType=boardCards[coord.x][coord.y]
            if (adjacentCardType==KingdomCard.Forest){
              elfPoints+=2
            } else if (adjacentCardType==KingdomCard.Swamp){
              elfPoints-=1
            } else if (adjacentCardType==KingdomCard.Goblin ||
              adjacentCardType==KingdomCard.Dwarf){
              conflictPoints+=1
            }
          })
        } else if (currentCard==KingdomCard.Dwarf){
          // Lands and conflicts
          this.getAdjacentCardsIncludingPortals(i, j, boardCards).forEach(coord => {
            let adjacentCardType=boardCards[coord.x][coord.y]
            if (adjacentCardType==KingdomCard.Mountain){
              dwarfPoints+=2
            } else if (adjacentCardType==KingdomCard.Goblin ||
              adjacentCardType==KingdomCard.Elf){
              conflictPoints+=1
            }
          })
        } else if (currentCard==KingdomCard.Portal){
          // No points for portals
        } else if (currentCard==KingdomCard.Dragon){
          nbDragons+=1

          // Is it domesticated ?
          let nbSurroundingHumans=0
          let nbSurroundingDwarfs=0
          let nbSurroundingElves=0
          this.getAdjacentCardsIncludingPortals(i, j, boardCards).forEach(coord => {
            let adjacentCardType=boardCards[coord.x][coord.y]
            if (adjacentCardType==KingdomCard.Human){
              nbSurroundingHumans+=1
            } else if (adjacentCardType==KingdomCard.Dwarf){
              nbSurroundingDwarfs+=1
            } else if (adjacentCardType==KingdomCard.Elf){
              nbSurroundingElves+=1
            }
          })
          if (nbSurroundingHumans>=2 || nbSurroundingDwarfs>=2 || nbSurroundingElves>=2){
            // The dragon is domesticated
            nbDomesticatedDragons+=1
          }
        } else {
          if (currentCard!==-1){
            console.log("Unknown card type - "+currentCard+" - square "+i+"-"+j)
          }
        }
      }
    }

    // Note: Each conflit is reported twice.
    // So the number of reported conflicts is actually the expected nb of conflict points

    // Dragons
    let dragonValue=0
    if (nbDragons>3){
      dragonValue=6
      if (nbDomesticatedDragons>3)
        nbDomesticatedDragons=3
    } else if (nbDragons==3){
      dragonValue=6
    } else if (nbDragons==2){
      dragonValue=5
    } else if (nbDragons==1){
      dragonValue=3
    }
    let dragonPoints=nbDomesticatedDragons*dragonValue-(nbDragons-nbDomesticatedDragons)*dragonValue

    // Legend cards
    let legendPoints=0

    allLegendCardIds.forEach(id => legendPoints+=this.legendCardValue(id))

    // Result
    return new PlayerScore(
      elfPoints,
      dwarfPoints,
      humanPoints,
      goblinPoints,
      dragonPoints,
      legendPoints,
      -conflictPoints)
  }

  legendCardValue(card:LegendCard): number{
    if (card==LegendCard.LinkedHumanElf) return 2
    if (card==LegendCard.LinkedHumanDwarf) return 2
    if (card==LegendCard.TwoLinkedGoblins) return 2
    if (card==LegendCard.TwoLinkedHumans) return 2
    if (card==LegendCard.TwoLinkedElves) return 2
    if (card==LegendCard.TwoLinkedDwarfs) return 2
    if (card==LegendCard.FourTribes) return 4
    if (card==LegendCard.TwoVsOne_GoblinHuman) return 3
    if (card==LegendCard.TwoVsOne_GoblinElf) return 3
    if (card==LegendCard.TwoVsOne_GoblinDwarf) return 3
    if (card==LegendCard.TwoVsOne_ElfDwarf) return 3
    if (card==LegendCard.ThreeLinkedPlains) return 4
    if (card==LegendCard.ThreeLinkedSwamps) return 4
    if (card==LegendCard.ThreeLinkedMountains) return 4
    if (card==LegendCard.ThreeLinkedForests) return 4
    console.log("*** ERROR - Unsupported legend card")
    return 0
  }

  legendAnalysis(player:number,
    allKingdomCards:Material<number, MaterialType, LocationType>) : LegendCharacteristics {
    // Aggregate card ids into a 4x4 array
    let boardCards=this.toGrid(player, allKingdomCards)
    return this.legendAnalysisFromGrid(boardCards)
  }

  legendAnalysisFromGrid(boardCards:KingdomCard[][]): LegendCharacteristics {
    let has2connectedElves=false //
    let has2connectedDwarfs=false //
    let has2connectedHumans=false //
    let has2connectedGoblins=false //
    let has3connectedForests=false //
    let has3connectedMountains=false //
    let has3connectedPlains=false //
    let has3connectedSwamps=false //
    let hasAllTribes=false //
    let hasConnectedHumanDwarf=false //
    let hasConnectedHumanElf=false //
    let has2vs1_goblinElf=false //
    let has2vs1_goblinDwarf=false //
    let has2vs1_goblinHuman=false //
    let has2vs1_dwarfElf=false //

    // Loop on cards
    let hasElf=false
    let hasDwarf=false
    let hasHuman=false
    let hasGoblin=false
    for (let i=0; i<4; i++){
      for (let j=0; j<4; j++){
        let currentCard=boardCards[i][j]
        if (currentCard === undefined)
          continue

        // Note from Francois - Lands may be connected through portals
        if (currentCard==KingdomCard.Plain){
          // 3 connected plains ?
          let nbConnectedPlains=0
          this.getAdjacentCardsIncludingPortals(i, j, boardCards).forEach(coord => {
            let adjacentCardType=boardCards[coord.x][coord.y]
            if (adjacentCardType==KingdomCard.Plain){
              nbConnectedPlains+=1
            }
          })
          if (nbConnectedPlains>=2)
            has3connectedPlains=true
        } else if (currentCard==KingdomCard.Swamp){
          // 3 connected swamps ?
          let nbConnectedSwamps=0
          this.getAdjacentCardsIncludingPortals(i, j, boardCards).forEach(coord => {
            let adjacentCardType=boardCards[coord.x][coord.y]
            if (adjacentCardType==KingdomCard.Swamp){
              nbConnectedSwamps+=1
            }
          })
          if (nbConnectedSwamps>=2)
            has3connectedSwamps=true
        } else if (currentCard==KingdomCard.Mountain){
          // 3 connected mountains ?
          let nbConnectedMountains=0
          this.getAdjacentCardsIncludingPortals(i, j, boardCards).forEach(coord => {
            let adjacentCardType=boardCards[coord.x][coord.y]
            if (adjacentCardType==KingdomCard.Mountain){
              nbConnectedMountains+=1
            }
          })
          if (nbConnectedMountains>=2)
            has3connectedMountains=true
        } else if (currentCard==KingdomCard.Forest){
          // 3 connected forests ?
          let nbConnectedForests=0
          this.getAdjacentCardsIncludingPortals(i, j, boardCards).forEach(coord => {
            let adjacentCardType=boardCards[coord.x][coord.y]
            if (adjacentCardType==KingdomCard.Forest){
              nbConnectedForests+=1
            }
          })
          if (nbConnectedForests>=2)
            has3connectedForests=true
        } else if (currentCard==KingdomCard.Goblin){
          hasGoblin=true
          let nbSurroundingElves=0
          let nbSurroundingDwarfs=0
          let nbSurroundingHumans=0

          // 2 connected goblins ?
          // Goblins cannot use portals
          this.getDirectlyAdjacentCards(i, j).forEach(coord => {
            let adjacentCardType=boardCards[coord.x][coord.y]
            if (adjacentCardType==KingdomCard.Goblin){
              has2connectedGoblins=true
            } else if (adjacentCardType==KingdomCard.Elf){
              nbSurroundingElves+=1
            } else if (adjacentCardType==KingdomCard.Dwarf){
              nbSurroundingDwarfs+=1
            } else if (adjacentCardType==KingdomCard.Human){
              nbSurroundingHumans+=1
            }
          })
          if (nbSurroundingElves>=2)
            has2vs1_goblinElf=true
          if (nbSurroundingDwarfs>=2)
            has2vs1_goblinDwarf=true
          if (nbSurroundingHumans>=2)
            has2vs1_goblinHuman=true
        } else if (currentCard==KingdomCard.Elf){
          hasElf=true
          let nbSurroundingGoblins=0
          let nbSurroundingDwarfs=0

          // 2 connected elves
          this.getAdjacentCardsIncludingPortals(i, j, boardCards).forEach(coord => {
            let adjacentCardType=boardCards[coord.x][coord.y]
            if (adjacentCardType==KingdomCard.Elf){
              has2connectedElves=true
            } else if (adjacentCardType==KingdomCard.Goblin){
              nbSurroundingGoblins+=1
            } else if (adjacentCardType==KingdomCard.Dwarf){
              nbSurroundingDwarfs+=1
            }
          })
          if (nbSurroundingGoblins>=2)
            has2vs1_goblinElf=true
          if (nbSurroundingDwarfs>=2)
            has2vs1_dwarfElf=true
        } else if (currentCard==KingdomCard.Dwarf){
          hasDwarf=true
          let nbSurroundingGoblins=0
          let nbSurroundingElves=0

          // 2 connected dwarfs ?
          this.getAdjacentCardsIncludingPortals(i, j, boardCards).forEach(coord => {
            let adjacentCardType=boardCards[coord.x][coord.y]
            if (adjacentCardType==KingdomCard.Dwarf){
              has2connectedDwarfs=true
            } else if (adjacentCardType==KingdomCard.Goblin){
              nbSurroundingGoblins+=1
            } else if (adjacentCardType==KingdomCard.Elf){
              nbSurroundingElves+=1
            }
          })
          if (nbSurroundingGoblins>=2)
            has2vs1_goblinDwarf=true
          if (nbSurroundingElves>=2)
            has2vs1_dwarfElf=true
        } else if (currentCard==KingdomCard.Human){
          hasHuman=true
          let nbSurroundingGoblins=0

          // 2 connected humans ? connected human-dwarf ? connected human-elf ?
          this.getAdjacentCardsIncludingPortals(i, j, boardCards).forEach(coord => {
            let adjacentCardType=boardCards[coord.x][coord.y]
            if (adjacentCardType==KingdomCard.Human){
              has2connectedHumans=true
            } else if (adjacentCardType==KingdomCard.Dwarf){
              hasConnectedHumanDwarf=true
            } else if (adjacentCardType==KingdomCard.Elf){
              hasConnectedHumanElf=true
            } else if (adjacentCardType==KingdomCard.Goblin){
              nbSurroundingGoblins+=1
            }
          })
          if (nbSurroundingGoblins>=2)
            has2vs1_goblinHuman=true
        }
      }
    }

    // All tribes ?
    hasAllTribes=hasGoblin && hasElf && hasHuman && hasDwarf

    return new LegendCharacteristics(
      has2connectedElves,
      has2connectedDwarfs,
      has2connectedHumans,
      has2connectedGoblins,
      has3connectedForests,
      has3connectedMountains,
      has3connectedPlains,
      has3connectedSwamps,
      hasAllTribes,
      hasConnectedHumanDwarf,
      hasConnectedHumanElf,
      has2vs1_goblinElf,
      has2vs1_goblinDwarf,
      has2vs1_goblinHuman,
      has2vs1_dwarfElf)
  }

  getDirectlyAdjacentCards(i:number, j:number) : GridCoordSet {
    let res = new GridCoordSet()
    if (i>0)
      res.add(new GridCoord(i-1, j))
    if (i<3)
      res.add(new GridCoord(i+1, j))
    if (j>0)
      res.add(new GridCoord(i, j-1))
    if (j<3)
      res.add(new GridCoord(i, j+1))
    return res
  }

  getAdjacentCardsIncludingPortals(i:number, j:number, board:KingdomCard[][]) : GridCoordSet {
    let ignoredCoords = new GridCoordSet()
    return this.getAdjacentCardsIncludingPortals_inner(i, j, board, ignoredCoords)
  }

  getAdjacentCardsIncludingPortals_inner(i:number, j:number, board:KingdomCard[][], ignoredCoords:GridCoordSet) : GridCoordSet {
    ignoredCoords.add(new GridCoord(i, j))

    let directAdjacentCards=this.getDirectlyAdjacentCards(i,j)
    let res = new GridCoordSet()
    directAdjacentCards.forEach(coord => {
      if (ignoredCoords.has(coord))
        return
      res.add(coord)
      ignoredCoords.add(coord)
      if (board[coord.x][coord.y]==KingdomCard.Portal){
        let portalAdjacentCards=this.getAdjacentCardsIncludingPortals_inner(coord.x, coord.y, board, ignoredCoords)
        portalAdjacentCards.forEach(coord2 => {
          res.add(coord2)
        })
      }
    })
    return res
  }

  getTieBreaker(tieBreaker: number, scoreDetails: PlayerScore): number | undefined {
    // The highest score among the 7 categories is used
    // Otherwise the next highest score, etc.
    const values = [
      scoreDetails.elfPoints,
      scoreDetails.dwarfPoints,
      scoreDetails.humanPoints,
      scoreDetails.goblinPoints,
      scoreDetails.dragonPoints,
      scoreDetails.legendPoints,
      scoreDetails.conflictPoints
    ]
    // Order values - highest to smallest - Numeric sort
    values.sort(function (a, b) {
      return b - a
    })

    return values[tieBreaker - 1]
  }
}

export const score = new Score()
