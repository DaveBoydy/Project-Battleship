import setupPage from '../../assets/templates/setup.html'
import makeScreen from '../views/screens'
import makeGrid from '../views/components/grid'
import setupClickHandler from '../views/events/setup'
import { setupEnemyBoard } from '../utils/setup'

const battleshipContainer = document.querySelector('#battleship-container')
const setupScreen = makeScreen(setupPage)
const grid = makeGrid('player')

const setupScreenController = {
  addSetupScreen: () => {
    battleshipContainer!.appendChild(setupScreen)
    const setupGrid = document.querySelector('#setup-grid')
    setupGrid!.appendChild(grid)
    setupClickHandler.init()
    setupEnemyBoard()
  },
  removeSetupScreen: (): void => {
    const setupScreen = document.querySelector('#setup-screen')
    if (setupScreen != null) {
      battleshipContainer!.removeChild(setupScreen)
      setupClickHandler.destroy()
    }
  },
}

export default setupScreenController
