import React from 'react'
import { number } from 'prop-types'

import './styles.css'

const Counter = ({ rows, cols, generation }) => (
  <div className='counter-container'>
    <h2>Game ({`${rows}x${cols}`}) has started.</h2>

    <h2>Generation {generation}</h2>
  </div>
)

Counter.propTypes = {
  rows: number.isRequired,
  cols: number.isRequired,
  generation: number.isRequired
}

export default Counter
