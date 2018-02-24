import React from 'react'
import { bool, number, func } from 'prop-types'

import './styles.css'

const Cell = ({ isAlive, rowIndex, colIndex, onClick }) => (
  <div
    className={`cell ${isAlive ? 'alive' : 'dead'}`}
    onClick={() => onClick(rowIndex, colIndex)}
  />
)

Cell.propTypes = {
  isAlive: bool,
  rowIndex: number.isRequired,
  colIndex: number.isRequired,
  onClick: func.isRequired
}

export default Cell
