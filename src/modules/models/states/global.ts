import Battleship, { BattleFacade } from '../../controllers/battleship'

type universalState = {
  battleship: BattleFacade
  deployComplete: boolean
  playerMap: Element
}

const globalState: universalState = {
  battleship: Battleship,
  deployComplete: false,
  playerMap: document.createElement('div'),
}

export default globalState
