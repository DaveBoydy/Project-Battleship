const makeGrid = (player: string): HTMLDivElement => {
  const size = 10
  const container = document.createElement('div')
  container.setAttribute('class', 'table')

  for (let y = 0; y < size; y++) {
    const row = document.createElement('div')
    row.setAttribute('class', 'row')

    for (let x = 0; x < size; x++) {
      const cell = document.createElement('div')
      cell.setAttribute('class', 'cell')
      cell.setAttribute(`data-cell-${player}-id`, `${y},${x}`)
      row.appendChild(cell)
    }
    container.appendChild(row)
  }

  return container
}

export default makeGrid
