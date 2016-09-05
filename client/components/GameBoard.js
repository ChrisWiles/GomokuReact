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
    socket.on('player move', data => this._updateBoard(data))
  }

  _updateBoard(data) {
    if(data.gameID === this.props.gameID) {
      this.setState({board: data.board})
    }
  }

  _initializeBoard() {
    const board = []
    const rows = 'ABCDEFGHIJKLMNO'.split('')
    const cols = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

    rows.forEach(row => {
    	const Row = []
    	cols.forEach(col => {
    		Row.push({id: row + col, player: 0})
    	})
    	board.push(Row)
    })

    this.setState({board})
  }

  _createTiles(tiles) {
    const b = []
    tiles.forEach(ele => b.push(...ele))
    return b.map((tile, i) => {
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
    const b = []
    this.state.board.forEach(ele => b.push(...ele))
    b.forEach(tile => {
      if(tile.id === id) {
        tile.player = this.props.player
      }
    })
    this._isWin(this.state.board, this.props.player)
  }

  _isWin(board, p) {
    const b = []
    board.forEach(ele => b.push(...ele))

    const rows = 'ABCDEFGHIJKLMNO'.split('')
    const cols = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

    function horizontal(b, p) {
      const Row = []
      rows.forEach(char => {
        b.forEach(item => {
          if(item.id.slice(0,1) === char) {
            Row.push(item.player.toString())
          }
        })
        Row.push('0')
      })
      return /(1{5,5})|(2{5,5})/.test(Row.join(''))
    }

    function vertical(b, p) {
      const Col = []
      cols.forEach(char => {
        b.forEach(item => {
          if(+item.id.slice(1) === char) {
            Col.push(item.player.toString())
          }
        })
        Col.push('0')
      })
      return /(1{5,5})|(2{5,5})/.test(Col.join(''))
    }

    function diagonal(board, p) {
      const diagonals = []
      for(let i = 0; i < board.length; i++) {
      	const diagonal = []
      	for(let j = 0; j < board[i].length; j++) {
      		diagonal.push(board[i][j].player)
      	}
      	diagonals.push(diagonal)
      }

      function getDiagonals(m) {
        var s, x, y, d,
            o = [];
        for (s = 0; s < m.length; s++) {
          d = [];
          for(y = s, x = 0; y >= 0; y--, x++)
            d.push(m[y][x]);
          o.push(d);
        }
        for (s = 1; s < m[0].length; s++) {
          d = [];
          for(y = m.length - 1, x = s; x < m[0].length; y--, x++)
            d.push(m[y][x]);
          o.push(d);
        }
        return o;
      }
      
      const diagonalsRight = getDiagonals(diagonals)
      const dRight = []
      diagonalsRight.forEach(ele => {
        dRight.push(...ele, '0')
      })
      return /(1{5,5})|(2{5,5})/.test(dRight.join(''))
    }


    if(horizontal(b,p) || vertical(b,p) || diagonal(board,p)) {
      console.log('Player', p, 'Won')
    }

    this.setState({board})
    socket.emit('player move', {gameID: this.props.gameID, board: board})
  }

  render() {
    const Tiles = this._createTiles(this.state.board)
    return (
      <div>{Tiles}</div>
    )
  }
}
