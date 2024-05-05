/** @jsxImportSource @emotion/react */
import { PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { CustomMoveType } from '@gamepark/aetherya/rules/CustomMoveType'

export const ChooseLegendaryHeader = () => {
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  return <>Piochez une carte légendes ou <PlayMoveButton move={pass}>Passez</PlayMoveButton></>
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
