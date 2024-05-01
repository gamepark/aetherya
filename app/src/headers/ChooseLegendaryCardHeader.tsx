/** @jsxImportSource @emotion/react */
// import { AetheryaRules } from '@gamepark/aetherya/AetheryaRules'
// import { PlayMoveButton, useLegalMove, usePlayerId, /* usePlayerName, */ useRules } from '@gamepark/react-game'
// import { isStartRule } from '@gamepark/rules-api'
//import { isCustomMoveType } from '@gamepark/rules-api'
//import { CustomMoveType } from '@gamepark/aetherya/rules/CustomMoveType'

export const ChooseLegendaryCardHeader = () => {
  return <>Piochez une carte légende ou Prenez celle de la défausse</>
/*
  const rules = useRules<AetheryaRules>()!
  const playerId = usePlayerId()
//  const draw = useLegalMove(isStartRule)
  const draw = useLegalMove(isCustomMoveType(CustomMoveType.DrawLegendaryCard))
  // const playerName = usePlayerName(rules.game.rule?.player)

  if (rules.game.rule?.player === playerId) {
    return <><PlayMoveButton move={draw}>Piochez</PlayMoveButton> une carte légende ou Prenez celle de la défausse</>
  } else {
    return <>Piochez une carte légende ou Prenez celle de la défausse</>
  }
*/
}
