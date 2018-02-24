import React from 'react'
import { number, func } from 'prop-types'

import './styles.css'

const GameOptions = ({ rows, cols, handleRowSize, handleColSize, startGame }) => (
  <div className='game-options-container'>
    <h2>Game Options:</h2>

    <div className='game-controls'>
      <p className='label'>Number of rows:</p>
      <input type='number' value={rows} onChange={handleRowSize} />

      <p className='label'>Number of cols:</p>
      <input type='number' value={cols} onChange={handleColSize} />
    </div>

    <button onClick={startGame}>Start!</button>
  </div>
)

GameOptions.propTypes = {
  rows: number.isRequired,
  cols: number.isRequired,
  handleRowSize: func.isRequired,
  handleColSize: func.isRequired,
  startGame: func.isRequired
}

export default GameOptions
