import React, { Component } from 'react'
import { render } from 'react-dom'

import { reducer } from 'duck'
import { GameOfLife } from 'containers'

// Decided to remove both redux and react-redux to showcase that we
// can have the same functionality without adding those two dependencies

const withDevTools = (
  process.env.NODE_ENV === 'development' &&
  typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION__
)

class App extends Component {
  state = reducer()

  dispatch = action => {
    const newState = reducer(this.state, action)
    this.setState(newState, () => {
      if (withDevTools) this.devTools.send(action.type, newState);
    })
  }

  // We don't care about unmount since there is only one component using this pattern
  componentWillMount = () => {
    if (withDevTools) {
      this.devTools = withDevTools.connect({ name: 'Game Of Life' })
      this.devTools.init(reducer())
    }
  }

  render = () => <GameOfLife state={this.state} dispatch={this.dispatch} />
}

render(<App />, document.getElementById('root'))
