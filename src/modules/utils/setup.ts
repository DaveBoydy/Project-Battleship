import setupState from '../models/states/setup'
import globalState from '../models/states/global'

function getValidEndCells(type: string, cell: number[]) {
  const model = playerShipModel(type)!

  globalState.battleship.getPlayerBoard().markShipStart(model, cell)

  return globalState.battleship.getPlayerBoard().getValidMarks()
}

function togglePlayerShip() {
  const deployText = document.querySelector('#deploy-ship-type')
  const launchFleet = document.querySelector('#launch-fleet')
  const setupGrid = document.querySelector('#setup-grid')
  switch (setupState.playerDeployType) {
    case 'c':
      setupState.playerDeployType = 'b'
      deployText!.textContent = 'Deploy the Battleship'
      setupState.markStart = true
      break
    case 'b':
      setupState.playerDeployType = 'd'
      deployText!.textContent = 'Deploy the Destroyer'
      setupState.markStart = true
      break
    case 'd':
      setupState.playerDeployType = 's'
      deployText!.textContent = 'Deploy the Submarine'
      setupState.markStart = true
      break
    case 's':
      setupState.playerDeployType = 'p'
      deployText!.textContent = 'Deploy the Patrol Boat'
      setupState.markStart = true
      break
    default:
      deployText!.textContent = 'Engage the enemy'
      globalState.deployComplete = true
      if (setupGrid != null) {
        globalState.playerMap = setupGrid
      }

      launchFleet!.classList.add('launch-ready')
  }
}

function playerShipModel(model: string) {
  switch (model) {
    case 'c':
      return globalState.battleship.getPlayerCarrier()
    case 'b':
      return globalState.battleship.getPlayerBattleShip()
    case 'd':
      return globalState.battleship.getPlayerDestroyer()
    case 's':
      return globalState.battleship.getPlayerSubmarine()
    case 'p':
      return globalState.battleship.getPlayerPatrol()
  }
}

function markDeployStart(target: HTMLElement) {
  if (
    target.classList.contains('cell') &&
    target.textContent === '' &&
    setupState.markStart === true
  ) {
    // mark the start location
    target.textContent = setupState.playerDeployType

    setupState.markStart = false
    setupState.startCell = target.dataset.cellPlayerId!.split(',').map(Number)
    // get valid locations for ship end relative to ship start
    setupState.validMarks = getValidEndCells(
      target.textContent,
      setupState.startCell,
    )

    // add screen visual markers
    for (const coOrd of setupState.validMarks) {
      const cell = document.querySelector(
        `[data-cell-player-id="${coOrd.toString()}"]`,
      )
      cell!.classList.add('beacon', 'animate-pulse')
    }
  }
}

function markDeployEnd(target: HTMLElement) {
  if (target.classList.contains('beacon') && setupState.markStart === false) {
    // mark the end location
    target.textContent = setupState.playerDeployType

    const ship = playerShipModel(target.textContent)

    globalState.battleship
      .getPlayerBoard()
      .markShipEnd(
        ship!,
        setupState.startCell,
        target.dataset.cellPlayerId!.split(',').map(Number),
      )

    // mark between the start and end locations
    for (const coOrd of ship!.getMiddleMarks()) {
      const cell = document.querySelector(
        `[data-cell-player-id="${coOrd.toString()}"]`,
      )
      cell!.textContent = setupState.playerDeployType
    }

    // remove screen visual markers
    for (const coOrd of setupState.validMarks) {
      const cell = document.querySelector(
        `[data-cell-player-id="${coOrd.toString()}"]`,
      )
      cell!.classList.remove('beacon', 'animate-pulse')
    }
    togglePlayerShip()
  }
}

function setupEnemyBoard() {
  const fleet = ['c', 'b', 'd', 's', 'p']

  for (const ship of fleet) {
    const [yS, xS] = getValidGridCell()
    const model = enemyShipModel(ship)!
    globalState.battleship.getComputerBoard().markShipStart(model, [yS, xS])
    const validMarks = globalState.battleship.getComputerBoard().getValidMarks()
    const randomMark = Math.floor(Math.random() * validMarks.length)
    const [yE, XE] = validMarks[randomMark]
    globalState.battleship
      .getComputerBoard()
      .markShipEnd(model, [yS, xS], [yE, XE])
  }
}

function getValidGridCell() {
  let [y, x] = generateRandomGridCell()
  const enemyMap = globalState.battleship.getComputerBoard().getBoard()
  let valid = true

  if (enemyMap[y][x] !== '0') {
    valid = false

    while (valid === false) {
      ;[y, x] = generateRandomGridCell()
      if (enemyMap[y][x] === '0') {
        valid = true
      }
    }
  }

  return [y, x]
}

function generateRandomGridCell() {
  const y = Math.floor(Math.random() * 10)
  const x = Math.floor(Math.random() * 10)
  const coOrds = [y, x]

  return coOrds
}

function enemyShipModel(model: string) {
  switch (model) {
    case 'c':
      return globalState.battleship.getEnemyCarrier()
    case 'b':
      return globalState.battleship.getEnemyBattleShip()
    case 'd':
      return globalState.battleship.getEnemyDestroyer()
    case 's':
      return globalState.battleship.getEnemySubmarine()
    case 'p':
      return globalState.battleship.getEnemyPatrol()
  }
}

export { markDeployStart, markDeployEnd, setupEnemyBoard }
