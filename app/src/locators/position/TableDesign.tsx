/** @jsxImportSource @emotion/react */
import { LocationContext } from '@gamepark/react-game'
import { MaterialRules, Location } from '@gamepark/rules-api'
export class TableDesign {
  nbPlayers(rules: MaterialRules){
    return rules.players.length
  }

  getTableSize(players:number){
    switch (players) {
      case 1:
        return { xMin: -56, xMax: 12, yMin: -34, yMax: 17 }
      case 2:
        return { xMin: -55, xMax: 57, yMin: -35, yMax: 17 }
      case 3:
        return { xMin: -55, xMax: 57, yMin: -37, yMax: 37 }
      case 4:
        return { xMin: -49, xMax: 54, yMin: -42, yMax: 42 }
      case 5:
        return { xMin: -55, xMax: 57, yMin: -37, yMax: 37 }
      case 6:
        return { xMin: -55, xMax: 57, yMin: -37, yMax: 37 }
    }

    // Error
    console.log("*** Unsupported table configuration")
    return { xMin: -55, xMax: 57, yMin: -35, yMax: 17 }
  }

  playerBoardCoordinates(location: Location, context: LocationContext){
//    const { player, rules } = context
    const locationPlayer = location.player
    const { rules } = context
    let nbPlayers=this.nbPlayers(rules)

    // Default value - If unsupported player number
    let x=0
    let y=0
    let z=0

    if (nbPlayers==1){
      x=-25
      y=0
    } else if (nbPlayers==2){
        if (locationPlayer==1){
          x=-25
          y=0
        } else if (locationPlayer==2){
          x=25
          y=0
        }
    } else if (nbPlayers==3){
      if (locationPlayer==1){
        x=-25
        y=20
      } else if (locationPlayer==2){
        x=-25
        y=-20
      } else if (locationPlayer==3){
        x=25
        y=-20
      }
    } else if (nbPlayers==4){
      if (locationPlayer==1){
        x=-15
        y=25
      } else if (locationPlayer==2){
        x=-15
        y=-25
      } else if (locationPlayer==3){
        x=20
        y=-25
      } else if (locationPlayer==4){
        x=20
        y=25
      }
    } else {
      // Error
      console.log("*** Unsupported table configuration")
    }
    return {x:x, y:y, z:z}
  }

  playerLegendLineCoordinates(location: Location, context: LocationContext){
    const boardCoord=this.playerBoardCoordinates(location, context)
    const locationPlayer = location.player
    const { rules } = context
    let nbPlayers=this.nbPlayers(rules)

    let deltaX=0
    if (nbPlayers==1){
      deltaX=-25
    } else if (nbPlayers==2){
      if (locationPlayer==1){
        deltaX=-25
      } else if (locationPlayer==2){
        deltaX=20
      }
    } else if (nbPlayers==3){
      if (locationPlayer==1){
        deltaX=-25
      } else if (locationPlayer==2){
        deltaX=-25
      } else if (locationPlayer==3){
        deltaX=20
      }
    } else if (nbPlayers==4){
      if (locationPlayer==1){
        deltaX=-25
      } else if (locationPlayer==2){
        deltaX=-25
      } else if (locationPlayer==3){
        deltaX=20
      } else if (locationPlayer==4){
        deltaX=20
      }
    } else {
      // Error
      console.log("*** Unsupported table configuration")
    }
    return {x:boardCoord.x+deltaX, y:boardCoord.y, z:boardCoord.z}
  }

  commonLegendLineCoordinates(context: LocationContext){
    const { rules } = context
    let nbPlayers=this.nbPlayers(rules)

    let x=0
    let y=0
    let z=0
    if (nbPlayers==1){
      x=-25
      y=-25
    } else if (nbPlayers==2){
        x=0
        y=-25
    } else if (nbPlayers==3){
      x=25
      y=13
    } else if (nbPlayers==4){
      x=25
      y=0
    } else {
      // Error
      console.log("*** Unsupported table configuration")
    }
    return {x:x, y:y, z:z}
  }

  commonLegendDeckCoordinates(context: LocationContext){
    const { rules } = context
    let nbPlayers=this.nbPlayers(rules)
    let lineCoord=this.commonLegendLineCoordinates(context)

    let deltaX=0
    let deltaY=0
    if (nbPlayers==1){
      deltaX=20
      deltaY=0
    } else if (nbPlayers==2){
        deltaX=-20
        deltaY=0
    } else if (nbPlayers==3){
      deltaX=-20
      deltaY=0
    } else if (nbPlayers==4){
      deltaX=-20
      deltaY=0
    } else {
      // Error
      console.log("*** Unsupported table configuration")
    }
    return {x:lineCoord.x+deltaX, y:lineCoord.y+deltaY, z:0.05}
  }

  kingdomDeckCoordinates(context: LocationContext){
    const { rules } = context
    let nbPlayers=this.nbPlayers(rules)

    let x=0
    let y=0

    if (nbPlayers==1){
      x=-5
      y=0
    } else if (nbPlayers==2){
      x=-5
      y=0
    } else if (nbPlayers==3){
      x=-5
      y=0
    } else if (nbPlayers==4){
      x=-20
      y=-3.75
    } else {
      // Error
      console.log("*** Unsupported table configuration")
    }
    return {x:x, y:y, z:0}
  }

  kingdomDiscardCoordinates(context: LocationContext){
    let deckCoord=this.kingdomDeckCoordinates(context)
    const { rules } = context
    let nbPlayers=this.nbPlayers(rules)

    let deltaX=0
    let deltaY=0
    if (nbPlayers==1){
      deltaX=10
      deltaY=0
    } else if (nbPlayers==2){
      deltaX=10
      deltaY=0
    } else if (nbPlayers==3){
      deltaX=10
      deltaY=0
    } else if (nbPlayers==4){
      deltaX=0
      deltaY=7.5
    } else {
      // Error
      console.log("*** Unsupported table configuration")
    }

    return {x:deckCoord.x+deltaX, y:deckCoord.y+deltaY, z:0}
  }

  scoreSheetCoordinates(context: LocationContext){
    const { rules } = context
    let nbPlayers=this.nbPlayers(rules)

    let x=0
    let y=0
    if (nbPlayers==1){
      x=5
      y=-25
    } else if (nbPlayers==2){
      x=25
      y=-25
    } else if (nbPlayers==3){
      x=0
      y=-27
    } else if (nbPlayers==4){
      x=-42
      y=0
    } else {
      // Error
      console.log("*** Unsupported table configuration")
    }
    return { x:x, y:y, z:10}
  }

  eventAreaCoordinates(context: LocationContext){
    const { rules } = context
    let nbPlayers=this.nbPlayers(rules)

    let x=0
    let y=0
    if (nbPlayers==1){
      x=0
      y=-10
    } else if (nbPlayers==2){
      x=0
      y=-10
    } else if (nbPlayers==3){
      x=0
      y=-10
    } else if (nbPlayers==4){
      x=-10
      y=0
    } else {
      // Error
      console.log("*** Unsupported table configuration")
    }
    return { x:x, y:y, z:10}
  }
}

export const tableDesign = new TableDesign()
