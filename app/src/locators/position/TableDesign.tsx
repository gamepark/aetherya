/** @jsxImportSource @emotion/react */
import { LocationContext } from '@gamepark/react-game'
import { MaterialRules, Location } from '@gamepark/rules-api'
export class TableDesign {
  nbPlayers(rules: MaterialRules){
    return rules.players.length
  }

  getTableSize(players:number){
    switch (players) {
      case 3:
        return { xMin: -27, xMax: 86, yMin: -24, yMax: 39 }
      case 4:
        return { xMin: -27, xMax: 86, yMin: -24, yMax: 39 }
      case 5:
        return { xMin: -27, xMax: 140, yMin: -33, yMax: 39 }
      case 6:
        return { xMin: -27, xMax: 140, yMin: -33, yMax: 39 }
      default:
        // 2 players
        return { xMin: -55, xMax: 57, yMin: -37, yMax: 17 }
    }
  }

  playerBoardCoordinates(location: Location, context: LocationContext){
//    const { player, rules } = context
    const locationPlayer = location.player
    const { rules } = context
    let nbPlayers=this.nbPlayers(rules)

    // Default value - If unsupported player number
    let x=-20
    let y=-20
    let z=0

    if (nbPlayers==2){
      if (locationPlayer==1){
        x=-25
        y=0
      } else if (locationPlayer==2){
        x=25
        y=0
      }
    } else {
      if (locationPlayer==1){
        x=-50
        y=50
      }
    }
    return {x:x, y:y, z:z}
  }

  playerLegendaryLineCoordinates(location: Location, context: LocationContext){
    const boardCoord=this.playerBoardCoordinates(location, context)
    const locationPlayer = location.player
    const { rules } = context
    let nbPlayers=this.nbPlayers(rules)

    let deltaX=0
    if (nbPlayers==2){
      if (locationPlayer==1){
        deltaX=-25
      } else if (locationPlayer==2){
        deltaX=20
      }
    }
    return {x:boardCoord.x+deltaX, y:boardCoord.y, z:boardCoord.z}
  }

  commonLegendaryLineCoordinates(_location: Location, _context: LocationContext){
/*
    const { rules } = context
    let nbPlayers=this.nbPlayers(rules)
*/
    return {x:0, y:-20, z:0}
  }

  playerHandCoordinates(location: Location, context: LocationContext){
    const boardCoord=this.playerBoardCoordinates(location, context)
    let deltaY=20
    return {x:boardCoord.x, y:boardCoord.y+deltaY, z:boardCoord.z}
  }
}

export const tableDesign = new TableDesign()
