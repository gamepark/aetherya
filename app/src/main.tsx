import { AetheryaOptionsSpec } from '@gamepark/aetherya/AetheryaOptions'
import { AetheryaRules } from '@gamepark/aetherya/AetheryaRules'
import { GameProvider } from '@gamepark/react-game'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { aetheryaAnimations } from './animation/AetheryaAnimations'
import App from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import { AetheryaTestSetup } from './tests/AetheryaTestSetup'
import { Tutorial } from './tutorial/Tutorial'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider
      game="aetherya"
      Rules={AetheryaRules}
      optionsSpec={AetheryaOptionsSpec}
      GameSetup={AetheryaTestSetup}
      material={Material}
      locators={Locators}
      animations={aetheryaAnimations}
      tutorial={new Tutorial()}
    >
      <App />
    </GameProvider>
  </StrictMode>
)
