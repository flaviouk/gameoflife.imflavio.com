import React from 'react'
import { number, arrayOf, bool, func } from 'prop-types'

import { Cell } from 'components'

import './styles.css'

const Grid = ({ rows, cols, game, toggleCell }) => (
  <div className='grid' style={{ width: rows * 11, height: cols * 11 }}>
    {game.map((cols, rowIndex) => cols.map((isAlive, colIndex) => (
      <Cell
        isAlive={isAlive}
        key={`${rowIndex}_${colIndex}`}
        rowIndex={rowIndex}
        colIndex={colIndex}
        onClick={toggleCell}
      />
    )))}
  </div>
)

Grid.propTypes = {
  rows: number.isRequired,
  cols: number.isRequired,
  game: arrayOf(arrayOf(bool)).isRequired,
  toggleCell: func.isRequired
}

export default Grid
