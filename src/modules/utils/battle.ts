import globalState from '../models/states/global'
import battleState from '../models/states/battle'

function launchPlayerAttack(target: HTMLElement) {
  const [y, x] = target.dataset.cellComputerId!.split(',').map(Number)
  const enemyWaters = globalState.battleship.getComputerBoard().getBoard()
  const enemyBoard = globalState.battleship.getComputerBoard()

  if (enemyWaters[y][x] !== '0') {
    target.textContent = 'X'
    target.classList.add('landed-hit')
    enemyBoard.receiveAttack([y, x])
    if (enemyBoard.isFleetSunk() === true) {
      gameOverPopup('Player wins')
    }
  }

  if (enemyWaters[y][x] === '0') {
    target.textContent = enemyWaters[y][x]
    target.classList.add('missed-target')
  }

  launchEnemyAttack()
}

function launchEnemyAttack() {
  const enemyWaters = globalState.battleship.getPlayerBoard().getBoard()

  const target =
    battleState.successiveHit === true
      ? validateAttack(attackAdjacentCells)
      : validateAttack(generateAttackCell)

  const [y, x] = target
  const enemyBoard = globalState.battleship.getPlayerBoard()
  const cell = document.querySelector(
    `[data-cell-player-id="${target.toString()}"]`,
  )

  const regex = /^[cbdsp]$/

  if (regex.test(enemyWaters[y][x])) {
    cell!.textContent = enemyWaters[y][x]
    cell!.classList.add('hit-landed')
    enemyBoard.receiveAttack([y, x])
    battleState.lastSuccessfulHit.push([y, x])
    battleState.successiveHit = true
    if (enemyBoard.isFleetSunk() === true) {
      gameOverPopup('Computer wins')
    }
  }

  if (enemyWaters[y][x] === '0') {
    cell!.textContent = enemyWaters[y][x]
    cell!.classList.add('missed-target')
  }
}

function gameOverPopup(gameOver: string) {
  const gameOverContainer = document.createElement('div')
  gameOverContainer.setAttribute('class', 'game-over-Container max-w-[900px]')

  const gameOverText = document.createElement('h2')
  gameOverText.setAttribute('class', 'game-over-text mb-4 text-4xl md:text-5xl')
  gameOverText.textContent = gameOver

  const gameOverButton = document.createElement('button')
  gameOverButton.setAttribute(
    'class',
    'game-over-button animate-pulse text-2xl md:text-3xl',
  )
  gameOverButton.setAttribute('id', 'battleship-restart')
  gameOverButton.textContent = 'Restart'

  gameOverContainer.appendChild(gameOverText)
  gameOverContainer.appendChild(gameOverButton)

  const battleshipContainer = document.querySelector('#battle-screen')
  battleshipContainer!.appendChild(gameOverContainer)
}

function validateAttack(callback: () => number[]) {
  let [y, x] = callback()

  if (!battleState.enemyAttacks.has([y, x].toString())) {
    battleState.enemyAttacks.add([y, x].toString())
  } else {
    while (battleState.enemyAttacks.has([y, x].toString())) {
      ;[y, x] = callback()
    }
    battleState.enemyAttacks.add([y, x].toString())
  }

  return [y, x]
}

function generateAttackCell() {
  const coOrds = [
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
  ]
  const [y, x] = coOrds

  return [y, x]
}

function attackAdjacentCells() {
  let [y, x] =
    battleState.lastSuccessfulHit[battleState.lastSuccessfulHit.length - 1]
  // north
  if (
    isWithinBounds([y - 1, x]) &&
    !battleState.enemyAttacks.has([y - 1, x].toString())
  ) {
    return [y - 1, x]
  }
  // east
  else if (
    isWithinBounds([y, x + 1]) &&
    !battleState.enemyAttacks.has([y, x + 1].toString())
  ) {
    return [y, x + 1]
  }
  // south
  else if (
    isWithinBounds([y + 1, x]) &&
    !battleState.enemyAttacks.has([y + 1, x].toString())
  ) {
    return [y + 1, x]
  }
  // west
  else if (
    isWithinBounds([y, x - 1]) &&
    !battleState.enemyAttacks.has([y, x - 1].toString())
  ) {
    return [y, x - 1]
  }
  // north east
  else if (
    isWithinBounds([y - 1, x + 1]) &&
    !battleState.enemyAttacks.has([y - 1, x + 1].toString())
  ) {
    return [y - 1, x + 1]
  }
  // south east
  else if (
    isWithinBounds([y + 1, x + 1]) &&
    !battleState.enemyAttacks.has([y + 1, x + 1].toString())
  ) {
    return [y + 1, x + 1]
  }
  // south west
  else if (
    isWithinBounds([y + 1, x - 1]) &&
    !battleState.enemyAttacks.has([y + 1, x - 1].toString())
  ) {
    return [y + 1, x - 1]
  }
  // north west
  else if (
    isWithinBounds([y - 1, x - 1]) &&
    !battleState.enemyAttacks.has([y - 1, x - 1].toString())
  ) {
    return [y - 1, x - 1]
  } else {
    //TODO break adjacent attack
    battleState.successiveHit = false
    return ([y, x] = generateAttackCell())
  }
}

function isWithinBounds([y, x]: number[]) {
  return x >= 0 && x < 10 && y >= 0 && y < 10
}

export { launchPlayerAttack, launchEnemyAttack }
