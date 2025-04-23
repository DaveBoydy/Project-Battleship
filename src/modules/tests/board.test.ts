import GameBoard from '../factories/board'
import Ship from '../factories/ship'

const carrier = Ship('c')
const battleship = Ship('b')
const destroyer = Ship('d')
const submarine = Ship('s')
const patrol = Ship('p')
let board = GameBoard()

beforeEach(() => {
  board = GameBoard()
})

describe('game board places ships at specified valid coordinates', () => {
  test('place b at [3, 4], [4, 3], [5, 2] and [6, 1] ', () => {
    const start = [3, 4]
    const end = [6, 1]
    board.markShipStart(battleship, start)
    board.markShipEnd(battleship, start, end)
    expect(board.getBoard()).toEqual([
      ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', 'b', '0', '0', '0', '0', '0'],
      ['0', '0', '0', 'b', '0', '0', '0', '0', '0', '0'],
      ['0', '0', 'b', '0', '0', '0', '0', '0', '0', '0'],
      ['0', 'b', '0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ])
  })
})

describe('mark a start point and get valid end points', () => {
  test('place p at [0, 0] and get [[0, 1], [1, 0], [1, 1]]', () => {
    board.markShipStart(patrol, [0, 0])
    expect(board.getValidMarks()).toEqual([
      [0, 1],
      [1, 0],
      [1, 1],
    ])
  })
  test('place p at [9, 9] and get [[8, 9], [9, 8], [8, 8]]', () => {
    board.markShipStart(patrol, [9, 9])
    expect(board.getValidMarks()).toEqual([
      [8, 9],
      [9, 8],
      [8, 8],
    ])
  })
  test('place p at [0, 9] and get [[0, 9], [0, 8], [1, 8]]', () => {
    board.markShipStart(patrol, [0, 9])
    expect(board.getValidMarks()).toEqual([
      [1, 9],
      [0, 8],
      [1, 8],
    ])
  })
  test('place p at [9, 0] and get [[8, 0], [9, 1], [8, 1]]', () => {
    board.markShipStart(patrol, [9, 0])
    expect(board.getValidMarks()).toEqual([
      [8, 0],
      [9, 1],
      [8, 1],
    ])
  })
  test('place c at [4, 4] and get [[0, 4], [4, 8], [8, 4], [4, 0], [0, 8], [8, 8], [8, 0], [0, 0],]', () => {
    board.markShipStart(carrier, [4, 4])
    expect(board.getValidMarks()).toEqual([
      [0, 4],
      [4, 8],
      [8, 4],
      [4, 0],
      [0, 8],
      [8, 8],
      [8, 0],
      [0, 0],
    ])
  })
  test('place d at [6, 3] and get [[6, 5],[8, 3],[4, 5],[8, 5],[9, 1],]', () => {
    const start = [3, 4]
    const end = [6, 1]
    board.markShipStart(battleship, start)
    board.markShipEnd(battleship, start, end)
    board.markShipStart(destroyer, [6, 3])
    expect(board.getValidMarks()).toEqual([
      [6, 5],
      [8, 3],
      [4, 5],
      [8, 5],
      [8, 1],
    ])
  })
  test('place d at [3, 3] and get [[1, 3],[3, 5],[3, 1],[0, 5],[5, 5], [0, 1],]', () => {
    const start = [4, 2]
    const end = [7, 5]
    board.markShipStart(battleship, start)
    board.markShipEnd(battleship, start, end)
    board.markShipStart(destroyer, [3, 3])
    expect(board.getValidMarks()).toEqual([
      [1, 3],
      [3, 5],
      [3, 1],
      [1, 5],
      [5, 5],
      [1, 1],
    ])
  })
  test('get [[2,9], [5,6], [2,3], [5,9]] ', () => {
    const start = [3, 2]
    const end = [7, 6]
    board.markShipStart(carrier, start)
    board.markShipEnd(carrier, start, end)
    board.markShipStart(battleship, [2, 6])
    expect(board.getValidMarks()).toEqual([
      [2, 9],
      [5, 6],
      [2, 3],
      [5, 9],
    ])
  })
  test('get [[4, 8], [7, 5]] ', () => {
    const start = [3, 7]
    const end = [7, 3]
    board.markShipStart(carrier, start)
    board.markShipEnd(carrier, start, end)
    board.markShipStart(battleship, [7, 8])
    // console.table(board.getBoard())
    expect(board.getValidMarks()).toEqual([
      [4, 8],
      [7, 5],
    ])
  })
  test('get ', () => {
    const start = [2, 3]
    const end = [6, 7]
    board.markShipStart(carrier, start)
    board.markShipEnd(carrier, start, end)
    board.markShipStart(battleship, [6, 6])
    // console.table(board.getBoard())
    expect(board.getValidMarks()).toEqual([
      [9, 6],
      [6, 3],
      [9, 9],
      [9, 3],
      [3, 3],
    ])
  })
})

describe('game board determines whether an attack misses or hits an enemy ship', () => {
  test('place o at [0, 0] ', () => {
    board.receiveAttack([0, 0])
    expect(board.getBoard()).toEqual([
      ['o', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ])
  })

  test('all hit ships have an x', () => {
    board = GameBoard()
    board.markShipStart(carrier, [0, 1])
    board.markShipEnd(carrier, [0, 1], [0, 5])
    board.markShipStart(battleship, [3, 5])
    board.markShipEnd(battleship, [3, 5], [6, 8])
    board.markShipStart(destroyer, [9, 0])
    board.markShipEnd(destroyer, [9, 0], [9, 2])
    board.markShipStart(submarine, [4, 3])
    board.markShipEnd(submarine, [4, 3], [6, 3])
    board.markShipStart(patrol, [1, 9])
    board.markShipEnd(patrol, [1, 9], [2, 9])
    board.receiveAttack([0, 2])
    board.receiveAttack([4, 6])
    board.receiveAttack([9, 1])
    board.receiveAttack([5, 3])
    board.receiveAttack([2, 9])
    // console.table(board.getBoard())
    expect(board.getBoard()).toEqual([
      ['0', 'c', 'x', 'c', 'c', 'c', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0', '0', 'p'],
      ['0', '0', '0', '0', '0', '0', '0', '0', '0', 'x'],
      ['0', '0', '0', '0', '0', 'b', '0', '0', '0', '0'],
      ['0', '0', '0', 's', '0', '0', 'x', '0', '0', '0'],
      ['0', '0', '0', 'x', '0', '0', '0', 'b', '0', '0'],
      ['0', '0', '0', 's', '0', '0', '0', '0', 'b', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ['d', 'x', 'd', '0', '0', '0', '0', '0', '0', '0'],
    ])
  })

  test('all ships are fully hit', () => {
    board.markShipStart(carrier, [0, 1])
    board.markShipEnd(carrier, [0, 1], [0, 5])
    board.receiveAttack([0, 1])
    board.receiveAttack([0, 2])
    board.receiveAttack([0, 3])
    board.receiveAttack([0, 4])
    board.receiveAttack([0, 5])

    board.markShipStart(battleship, [3, 5])
    board.markShipEnd(battleship, [3, 5], [6, 8])
    board.receiveAttack([3, 5])
    board.receiveAttack([4, 6])
    board.receiveAttack([5, 7])
    board.receiveAttack([6, 8])

    board.markShipStart(destroyer, [9, 0])
    board.markShipEnd(destroyer, [9, 0], [9, 2])
    board.receiveAttack([9, 0])
    board.receiveAttack([9, 1])
    board.receiveAttack([9, 2])

    board.markShipStart(submarine, [4, 3])
    board.markShipEnd(submarine, [4, 3], [6, 3])
    board.receiveAttack([4, 3])
    board.receiveAttack([5, 3])
    board.receiveAttack([6, 3])

    board.markShipStart(patrol, [1, 9])
    board.markShipEnd(patrol, [1, 9], [2, 9])
    board.receiveAttack([1, 9])
    board.receiveAttack([2, 9])
    console.table(board.getBoard())
    expect(board.getBoard()).toEqual([
      ['0', 'x', 'x', 'x', 'x', 'x', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0', '0', 'x'],
      ['0', '0', '0', '0', '0', '0', '0', '0', '0', 'x'],
      ['0', '0', '0', '0', '0', 'x', '0', '0', '0', '0'],
      ['0', '0', '0', 'x', '0', '0', 'x', '0', '0', '0'],
      ['0', '0', '0', 'x', '0', '0', '0', 'x', '0', '0'],
      ['0', '0', '0', 'x', '0', '0', '0', '0', 'x', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ['x', 'x', 'x', '0', '0', '0', '0', '0', '0', '0'],
    ])
  })
})
