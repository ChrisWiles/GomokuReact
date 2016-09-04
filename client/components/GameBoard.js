import React, { Component } from 'react'
import GameTile from './GameTile'
import { emitBoard } from '../models/game'

export default class GameBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      board: [],
      isTurn: true
    }
  }

  componentDidMount() {
    this._initializeBoard()
  }

  _initializeBoard() {
    const board = []
    const rows = 'ABCDEFGHIJKLMNO'.split('')
    const cols = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

    rows.forEach(row => {
    	cols.forEach(col => {
    		board.push({id: row + col, player: 0})
    	})
    })

    this.setState({board})
  }

  _createTiles(tiles) {
    return tiles.map((tile, i) => {
      return (
        <GameTile
          isTurn={this.state.isTurn}
          player={tile.player}
          id={tile.id}
          key={i}
          updatePlayerMove={this._updatePlayerMove.bind(this)}
        />
      )
    })
  }

  _updatePlayerMove(id) {
    //this.setState({isTurn: false})
    console.log(id)
    const board = this.state.board
    board.forEach(tile => {
      if(tile.id === id) {
        tile.player = 1
      }
    })
    this._isWin(board)
  }

  _isWin(board) {
    function horizontal(b) {

    }
    function vertical(b) {

    }
    function diagonal(b) {

    }

    this.setState({board})
    //emitBoard(board)
  }

  render() {
    const Tiles = this._createTiles(this.state.board)
    return (
      <div>{Tiles}</div>
    )
  }
}
