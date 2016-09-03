import React, { Component } from 'react'
import GameTile from './GameTile'

export default class GameBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      board: []
    }
  }

  componentDidMount() {
    this._initializeBoard()
  }

  _initializeBoard() {
    // create 2d game board
    const board = []
    const rows = 'abcdefghijklmno'.split('')
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
      return <GameTile player={tile.player} id={tile.id} key={i}/>
    })
  }

  render() {
    const Tiles = this._createTiles(this.state.board)
    return (
      <div>{Tiles}</div>
    )
  }
}
