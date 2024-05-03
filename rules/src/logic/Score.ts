import { Material /*, MaterialGame */ } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { KingdomCard } from '../material/KingdomCard'

export class PlayerScore {
  elfPoints:number
  dwarfPoints:number
  humanPoints:number
  goblinPoints:number
  dragonPoints:number
  legendaryPoints:number
  conflictPoints:number
  total:number

  constructor(
    elfPoints:number,
    dwarfPoints:number,
    humanPoints:number,
    goblinPoints:number,
    dragonPoints:number,
    legendaryPoints:number,
    conflictPoints:number){
    this.elfPoints=elfPoints
    this.dwarfPoints=dwarfPoints
    this.humanPoints=humanPoints
    this.goblinPoints=goblinPoints
    this.dragonPoints=dragonPoints
    this.legendaryPoints=legendaryPoints
    this.conflictPoints=conflictPoints
    this.total=elfPoints+dwarfPoints+humanPoints+goblinPoints+dragonPoints+legendaryPoints+conflictPoints
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
//    game:MaterialGame<number, MaterialType, LocationType>,
    allKingdomCards:Material<number, MaterialType, LocationType>) : number {
    let detailedScore=this.detailedPlayerScore(player, allKingdomCards)
    return detailedScore.total
  }

  detailedPlayerScore(player:number,
//    _game:MaterialGame<number, MaterialType, LocationType>,
    allKingdomCards:Material<number, MaterialType, LocationType>) : PlayerScore {

    let board=allKingdomCards.location(LocationType.PlayerBoard)
      .player(player)

    console.log('Player '+player)
/*
    console.log(game)
    console.log(board)
    console.log(board.getItems())
*/

    // Aggregate card ids into a 4x4 array
    let boardCards:number[][]=[[-1,-1,-1,-1],[-1,-1,-1,-1],[-1,-1,-1,-1],[-1,-1,-1,-1]]
    let items=board.getItems()
    for (let i=0; i<items.length; i++){
      let item=items[i]
      boardCards[item.location.y!-1][item.location.x!-1]=item.id
    }
    console.log(boardCards)

    // Score for each cards
    let elfPoints=0
    let dwarfPoints=0
    let humanPoints=0
    let goblinPoints=0
    let legendaryPoints=0
    let conflictPoints=0

    let nbDragons=0
    let nbDomesticatedDragons=0

    for (let i=0; i<4; i++){
      for (let j=0; j<4; j++){
        let currentCard=boardCards[i][j]
        if (currentCard === undefined){
          console.log("*** ERROR - Undefined card - "+i+" - "+j)
        }

        if (currentCard==KingdomCard.Plain ||
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
          console.log("Unknown card type - "+currentCard+" - square "+i+"-"+j)
        }
      }
    }

    let dragonValue=0
    if (nbDragons>3){
      nbDomesticatedDragons=0
      dragonValue=6
    } else if (nbDragons==3){
      dragonValue=6
    } else if (nbDragons==2){
      dragonValue=5
    } else if (nbDragons==1){
      dragonValue=3
    }
    let dragonPoints=nbDomesticatedDragons*dragonValue-(nbDragons-nbDomesticatedDragons)*dragonValue

    let total=elfPoints+dwarfPoints+humanPoints+goblinPoints+dragonPoints+legendaryPoints-conflictPoints

    console.log('Elf: '+elfPoints)
    console.log('Dwarf: '+dwarfPoints)
    console.log('Human: '+humanPoints)
    console.log('Goblin: '+goblinPoints)
    console.log('Dragon: '+dragonPoints)
    console.log('Legendary: '+legendaryPoints)
    console.log('Conflicts: '+(-conflictPoints))
    console.log('TOTAL: '+total)

    return new PlayerScore(
      elfPoints,
      dwarfPoints,
      humanPoints,
      goblinPoints,
      dragonPoints,
      legendaryPoints,
      -conflictPoints)
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
//    console.log("START - "+i+" - "+j)
    let ignoredCoords = new GridCoordSet()
    return this.getAdjacentCardsIncludingPortals_inner(i, j, board, ignoredCoords)
  }

  getAdjacentCardsIncludingPortals_inner(i:number, j:number, board:KingdomCard[][], ignoredCoords:GridCoordSet) : GridCoordSet {
/*
    console.log("inner - "+i+" - "+j)
    console.log("ignored:")
    console.log(ignoredCoords)
*/
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
//          if (ignoredCoords.has(coord2))
//            return
          res.add(coord2)
//          ignoredCoords.add(coord2)
        })
      }
    })
/*
    console.log("res - "+i+" - "+j+" =>")
    console.log(res)
*/
    return res
  }
}
