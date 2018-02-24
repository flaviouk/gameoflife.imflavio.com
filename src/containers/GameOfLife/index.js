import React, { Component } from 'react'
import { func, shape, arrayOf, bool, number } from 'prop-types'

import { Counter, GameOptions, Grid } from 'components'
import { actions } from 'duck'

const makeHandler = (dispatch, action) => ({ target: { value } }) => dispatch(action(value))

class GameOfLife extends Component {
  componentWillReceiveProps = nextProps => {
    const nextHasStarted = nextProps.state.hasStarted
    const { hasStarted } = this.props.state

    if (nextHasStarted && hasStarted !== nextHasStarted) {
      this.timer = setInterval(() => this.props.dispatch(actions.nextGen()), 50)
    }
  }

  componentWillUnmount = () => this.timer && clearInterval(this.timer)

  render = () => {
    const { state, dispatch } = this.props

    return (
      <div>
        {
          state.hasStarted
          ? <Counter rows={state.rows} cols={state.cols} generation={state.generation} />
          : (
            <GameOptions
              {...state}
              handleRowSize={makeHandler(dispatch, actions.handleRowSize)}
              handleColSize={makeHandler(dispatch, actions.handleColSize)}
              startGame={() => dispatch(actions.startGame())}
            />
          )
        }

        <Grid
          {...state}
          toggleCell={(rowIndex, colIndex) => {
            if (!state.hasStarted) dispatch(actions.toggleCell(rowIndex, colIndex))
          }}
        />
      </div>
    )
  }
}

GameOfLife.propTypes = {
  state: shape({
    game: arrayOf(arrayOf(bool)).isRequired,
    hasStarted: bool.isRequired,
    rows: number.isRequired,
    cols: number.isRequired
  }),
  dispatch: func.isRequired
}

export default GameOfLife
