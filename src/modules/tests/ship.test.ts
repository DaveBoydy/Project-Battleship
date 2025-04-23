import Ship from '../factories/ship'

describe('ship factory builds battleships', () => {
  let submarine = Ship('s')

  beforeEach(() => {
    submarine = Ship('s')
  })

  test('submarine length to be 3', () => {
    expect(submarine.getLength()).toBe(3)
  })

  test('submarine hit 0 times not to be sunk', () => {
    expect(submarine.isSunk()).toBeFalsy()
  })

  test('submarine hit 2 times to be 2', () => {
    submarine.hit()
    submarine.hit()
    expect(submarine.getDamage()).toBe(2)
  })
  test('submarine hit 2 times not to be sunk', () => {
    submarine.hit()
    submarine.hit()
    expect(submarine.isSunk()).toBeFalsy()
  })

  test('submarine hit 3 times is sunk', () => {
    submarine.hit()
    submarine.hit()
    submarine.hit()
    expect(submarine.isSunk()).toBeTruthy()
  })

  test('submarine hit 4 times is sunk', () => {
    submarine.hit()
    submarine.hit()
    submarine.hit()
    submarine.hit()
    expect(submarine.isSunk()).toBeTruthy()
  })

  test('submarine hit 3 times has 3 damage', () => {
    submarine.hit()
    submarine.hit()
    submarine.hit()
    expect(submarine.getDamage()).toBe(3)
  })

  test('submarine hit 0 times to be 0', () => {
    expect(submarine.getDamage()).toBe(0)
  })
})
