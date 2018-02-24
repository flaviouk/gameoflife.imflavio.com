// I like to use a slightly modified version of the ducks pattern
// https://github.com/erikras/ducks-modular-redux

import { makeNewGame, makeNextGenGame } from './utils'

const types = {
  START_GAME: 'START_GAME',
  HANDLE_ROW_SIZE: 'HANDLE_ROW_SIZE',
  HANDLE_COL_SIZE: 'HANDLE_COL_SIZE',
  TOGGLE_CELL: 'TOGGLE_CELL',
  NEXT_GEN: 'NEXT_GEN'
}

export const actions = {
  startGame: () => ({ type: types.START_GAME }),
  handleRowSize: val => ({ type: types.HANDLE_ROW_SIZE, val }),
  handleColSize: val => ({ type: types.HANDLE_COL_SIZE, val }),
  toggleCell: (rowIndex, colIndex) => ({ type: types.TOGGLE_CELL, rowIndex, colIndex }),
  nextGen: () => ({ type: types.NEXT_GEN })
}

const defaultSize = 50
const initialState = {
  game: makeNewGame({ rows: defaultSize, cols: defaultSize }),
  rows: defaultSize,
  cols: defaultSize,
  hasStarted: false,
  generation: 0
}

export const reducer = (state = initialState, action = {}) => {
  const parseNum = num => num > 500 ? 500 : Math.round(num)

  switch (action.type) {
    case types.START_GAME:
      return { ...state, hasStarted: true }

    case types.HANDLE_ROW_SIZE: {
      const rows = parseNum(action.val)
      return { ...state, rows, game: makeNewGame({ rows, cols: state.cols }) }
    }

    case types.HANDLE_COL_SIZE: {
      const cols = parseNum(action.val)
      return { ...state, cols, game: makeNewGame({ rows: state.rows, cols }) }
    }

    case types.TOGGLE_CELL: {
      const newGame = [...state.game]
      newGame[action.rowIndex][action.colIndex] = !newGame[action.rowIndex][action.colIndex]
      return { ...state, game: newGame }
    }

    case types.NEXT_GEN: {
      const newGame = makeNextGenGame(state)
      return { ...state, game: newGame, generation: state.generation + 1 }
    }

    default:
      return state
  }
}
