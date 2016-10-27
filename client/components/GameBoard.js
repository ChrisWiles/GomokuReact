import React, {Component, PropTypes} from 'react'
import GameTile from './GameTile'
import isWin from '../utli/isWin'
import initializeBoard from '../utli/initializeBoard'

class GameBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      board: [],
      p1Turn: true,
      p2Turn: false
    }
    // bind your event handlers in the constructor so they are only bound once for every instance
    this._updatePlayerMove = this._updatePlayerMove.bind(this)
  }

  componentDidMount() {
    const board = initializeBoard()
    this.setState({board})
    
    socket.on('player move', data => this._updateBoard(data))
  }

  _updateBoard(data) {
    if (data.gameID === this.props.gameID) {
      this.setState({
        p1Turn: !this.state.p1Turn,
        p2Turn: !this.state.p2Turn
      })
      this.setState({board: data.board})
    }
  }

  _createTiles({board, p1Turn, p2Turn}, {player}) {
    const b = []
    board.forEach(ele => b.push(...ele))

    let isTurn = false
    if(player === 1 && p1Turn) isTurn = true
    if(player === 2 && p2Turn) isTurn = true

    return b.map((tile, i) => {
      return(
        <GameTile
          isTurn={isTurn}
          player={tile.player}
          id={tile.id}
          key={i}
          updatePlayerMove={this._updatePlayerMove}
        />
      )
    })
  }

  _updatePlayerMove(id) {
    const {board} = this.state
    const {gameID, player} = this.props

    const b = []
    board.forEach(ele => b.push(...ele))

    b.forEach(tile => {
      if(tile.id === id) {
        tile.player = player
      }
    })

    if(isWin(board, player)) {
      console.log('Player', player, 'Won')
      socket.emit('player won', {gameID,player})
    }

    // this.setState({board})
    socket.emit('player move', {gameID, board})
  }

  render() {
    const Tiles = this._createTiles(this.state, this.props)
    return(
      <div>{Tiles}</div>
    )
  }
}


GameBoard.propTypes = {
  gameID: PropTypes.string.isRequired,
  player: PropTypes.number.isRequired
}

export default GameBoard
