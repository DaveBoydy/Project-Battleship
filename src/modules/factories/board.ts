import { WarShip } from './ship'

type ShipType = { [key: string]: WarShip }

export interface BattleBoard {
  getBoard(): string[][]
  getValidMarks(): number[][]
  markShipStart(ship: WarShip, [y, x]: number[]): void
  markShipEnd(ship: WarShip, start: number[], end: number[]): void
  receiveAttack([y, x]: number[]): void
  isFleetSunk(): boolean
}

const GameBoard = (): BattleBoard => {
  const board = Array.from({ length: 10 }, () => new Array(10).fill('0'))
  const fleet: ShipType = {}
  let endPoints: number[][] = []

  const getBoard = () => board
  const getValidMarks = () => endPoints

  // Mark ship starting location
  const markShipStart = (ship: WarShip, [y, x]: number[]) => {
    fleet[ship.getType()] = ship // set unique ship type
    board[y][x] = ship.getType() // mark start
    endPoints = [] // reset valid end positions

    calculateValidEndPoints(ship, [y, x])
  }

  // Mark in Cardinal and Ordinal directions
  const markShipEnd = (ship: WarShip, start: number[], end: number[]) => {
    const [yE, xE] = end

    markShipMiddle(ship, start, end)

    board[yE][xE] = ship.getType() // mark end
  }

  const receiveAttack = ([y, x]: number[]) => {
    switch (board[y][x]) {
      case 'c':
        board[y][x] = 'x'
        fleet.c.hit()
        break
      case 'b':
        board[y][x] = 'x'
        fleet.b.hit()
        break
      case 'd':
        board[y][x] = 'x'
        fleet.d.hit()
        break
      case 's':
        board[y][x] = 'x'
        fleet.s.hit()
        break
      case 'p':
        board[y][x] = 'x'
        fleet.p.hit()
        break
      case '0':
        board[y][x] = 'o'
        break
    }

    // isFleetSunk()
  }

  function isFleetSunk() {
    // check fleet init
    if (Object.keys(fleet).length === 5) {
      if (
        fleet.c.isSunk() &&
        fleet.b.isSunk() &&
        fleet.d.isSunk() &&
        fleet.s.isSunk() &&
        fleet.p.isSunk()
      ) {
        // reportFleetSunk()
        return true
      }
    }
    return false
  }

  // function reportFleetSunk() {
  //   console.log('the fleet has been sunk')
  // }

  // Calculate possible end positions relative to the starting position
  function calculateValidEndPoints(ship: WarShip, [y, x]: number[]) {
    const regex = /^[cbdsp]$/
    let isCollision = false
    // Check end position north of origin mark
    if (y - (ship.getLength() - 1) >= 0) {
      // detect collisions
      for (let i = 0; i < ship.getLength() - 1; ++i) {
        if (board[y - (i + 1)][x] !== '0') {
          isCollision = true
        }
      }
      if (!isCollision) endPoints.push([y - (ship.getLength() - 1), x])
      isCollision = false
    }

    // Check end position east of origin mark
    if (x + (ship.getLength() - 1) <= 9) {
      // detect collisions
      for (let i = 0; i < ship.getLength() - 1; ++i) {
        if (board[y][x + (i + 1)] !== '0') {
          isCollision = true
        }
      }
      if (!isCollision) endPoints.push([y, x + (ship.getLength() - 1)])
      isCollision = false
    }

    // Check end position south of origin mark
    if (y + (ship.getLength() - 1) <= 9) {
      // detect collisions
      for (let i = 0; i < ship.getLength() - 1; ++i) {
        if (board[y + (i + 1)][x] !== '0') {
          isCollision = true
        }
      }
      if (!isCollision) endPoints.push([y + (ship.getLength() - 1), x])
      isCollision = false
    }

    // Check end position west of origin mark
    if (x - (ship.getLength() - 1) >= 0) {
      // detect collisions
      for (let i = 0; i < ship.getLength() - 1; ++i) {
        if (board[y][x - (i + 1)] !== '0') {
          isCollision = true
        }
      }
      if (!isCollision) endPoints.push([y, x - (ship.getLength() - 1)])
      isCollision = false
    }

    // Check end position north east of origin mark
    if (y - (ship.getLength() - 1) >= 0 && x + (ship.getLength() - 1) <= 9) {
      // detect collisions
      for (let i = 0; i < ship.getLength() - 1; ++i) {
        if (
          regex.test(board[y - (i + 1)][x + (i + 1)]) ||
          // check NE gap
          (regex.test(board[y - (i + 1)][x + i]) &&
            regex.test(board[y + 1 - (i + 1)][x + (i + 1)]))
        ) {
          isCollision = true
        }
      }
      if (!isCollision)
        endPoints.push([y - (ship.getLength() - 1), x + (ship.getLength() - 1)])
      isCollision = false
    }

    // Check end position south east of origin mark
    if (y + (ship.getLength() - 1) <= 9 && x + (ship.getLength() - 1) <= 9) {
      // detect collisions
      for (let i = 0; i < ship.getLength() - 1; ++i) {
        if (
          regex.test(board[y + (i + 1)][x + (i + 1)]) ||
          // check SE gap
          (regex.test(board[y - 1 + (i + 1)][x + (i + 1)]) &&
            regex.test(board[y + (i + 1)][x - 1 + (i + 1)]))
        ) {
          isCollision = true
        }
      }
      if (!isCollision)
        endPoints.push([y + (ship.getLength() - 1), x + (ship.getLength() - 1)])
      isCollision = false
    }

    // Check end position south west of origin mark
    if (y + (ship.getLength() - 1) <= 9 && x - (ship.getLength() - 1) >= 0) {
      // detect collisions
      for (let i = 0; i < ship.getLength() - 1; ++i) {
        if (
          regex.test(board[y + (i + 1)][x - (i + 1)]) ||
          // check SW gap
          (regex.test(board[y - 1 + (i + 1)][x - (i + 1)]) &&
            regex.test(board[y + (i + 1)][x + 1 - (i + 1)]))
        ) {
          isCollision = true
        }
      }
      if (!isCollision)
        endPoints.push([y + (ship.getLength() - 1), x - (ship.getLength() - 1)])
      isCollision = false
    }

    // Check end position north west of origin mark
    if (y - (ship.getLength() - 1) >= 0 && x - (ship.getLength() - 1) >= 0) {
      // detect collisions
      for (let i = 0; i < ship.getLength() - 1; ++i) {
        if (
          regex.test(board[y - (i + 1)][x - (i + 1)]) ||
          // check NW gap
          (regex.test(board[y + 1 - (i + 1)][x - (i + 1)]) &&
            regex.test(board[y - (i + 1)][x + 1 - (i + 1)]))
        ) {
          isCollision = true
        }
      }
      if (!isCollision)
        endPoints.push([y - (ship.getLength() - 1), x - (ship.getLength() - 1)])
      isCollision = false
    }
  }

  function markShipMiddle(ship: WarShip, start: number[], end: number[]) {
    const [yS, xS] = start
    const [yE, xE] = end

    // If north
    if (yE < yS && xE === xS) {
      // mark between start and end
      for (let i = 0; i < ship.getLength() - 2; ++i) {
        board[yS - (1 + i)][xS] = ship.getType()
        ship.setMiddleMarks([yS - (1 + i), xS])
      }
    }

    // If east
    if (yE === yS && xE > xS) {
      // mark between start and end
      for (let i = 0; i < ship.getLength() - 2; ++i) {
        board[yS][xS + (1 + i)] = ship.getType()
        ship.setMiddleMarks([yS, xS + (1 + i)])
      }
    }

    // If south
    if (yE > yS && xE === xS) {
      // mark between start and end
      for (let i = 0; i < ship.getLength() - 2; ++i) {
        board[yS + (1 + i)][xS] = ship.getType()
        ship.setMiddleMarks([yS + (1 + i), xS])
      }
    }

    // If west
    if (yE === yS && xE < xS) {
      // mark between start and end
      for (let i = 0; i < ship.getLength() - 2; ++i) {
        board[yS][xS - (1 + i)] = ship.getType()
        ship.setMiddleMarks([yS, xS - (1 + i)])
      }
    }

    // If north east
    if (yE < yS && xE > xS) {
      // mark between start and end
      for (let i = 0; i < ship.getLength() - 2; ++i) {
        board[yS - (1 + i)][xS + (1 + i)] = ship.getType()
        ship.setMiddleMarks([yS - (1 + i), xS + (1 + i)])
      }
    }

    // If south east
    if (yE > yS && xE > xS) {
      // mark between start and end
      for (let i = 0; i < ship.getLength() - 2; ++i) {
        board[yS + (1 + i)][xS + (1 + i)] = ship.getType()
        ship.setMiddleMarks([yS + (1 + i), xS + (1 + i)])
      }
    }

    // If south west
    if (yE > yS && xE < xS) {
      // mark between start and end
      for (let i = 0; i < ship.getLength() - 2; ++i) {
        board[yS + (1 + i)][xS - (1 + i)] = ship.getType()
        ship.setMiddleMarks([yS + (1 + i), xS - (1 + i)])
      }
    }

    // If north west
    if (yE < yS && xE < xS) {
      // mark between start and end
      for (let i = 0; i < ship.getLength() - 2; ++i) {
        board[yS - (1 + i)][xS - (1 + i)] = ship.getType()
        ship.setMiddleMarks([yS - (1 + i), xS - (1 + i)])
      }
    }
  }

  return {
    getBoard,
    getValidMarks,
    markShipStart,
    markShipEnd,
    receiveAttack,
    isFleetSunk,
  }
}

export default GameBoard
