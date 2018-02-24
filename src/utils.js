export const makeNewGame = ({ rows, cols }) =>
  Array.from(new Array(rows), () => new Array(cols).fill(false))

const countNeighbours = ({ game, rowIndex, colIndex }) => {
  let counter = 0

  // Left side neighbours
  if (game[rowIndex + 1] && game[rowIndex + 1][colIndex - 1]) counter++
  if (game[rowIndex] && game[rowIndex][colIndex - 1]) counter++
  if (game[rowIndex - 1] && game[rowIndex - 1][colIndex - 1]) counter++
  // Right side neighbours
  if (game[rowIndex - 1] && game[rowIndex - 1][colIndex + 1]) counter++
  if (game[rowIndex] && game[rowIndex][colIndex + 1]) counter++
  if (game[rowIndex + 1] && game[rowIndex + 1][colIndex + 1]) counter++
  // Top and Bottom neighbours
  if (game[rowIndex + 1] && game[rowIndex + 1][colIndex]) counter++
  if (game[rowIndex - 1] && game[rowIndex - 1][colIndex]) counter++

  return counter
}

const decideFate = (cell, numNeighbours) => {
  if (cell) {
    if (numNeighbours < 2) return false
    if (numNeighbours === 2 || numNeighbours === 3) return true
    if (numNeighbours > 3) return false
  } return numNeighbours === 3
}

export const makeNextGenGame = ({ game, rows, cols }) =>
  makeNewGame({ rows, cols }).map((row, rowIndex) =>
    row.map((_, colIndex) => {
      const numNeighbours = countNeighbours({ game, rowIndex, colIndex })

      return decideFate(game[rowIndex][colIndex], numNeighbours)
    })
  )
