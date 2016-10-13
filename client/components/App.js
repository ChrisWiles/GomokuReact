import React, {Component} from 'react'
import GameBoard from './GameBoard'
import GameLobby from './GameLobby'

export default class App extends Component {
  constructor(props) {
    super(props)
    this._setGameID = this._setGameID.bind(this)
    this.state = {
      isLobby: true,
      gameID: null,
      player: 0
    }
  }

  componentDidMount() {
    socket.on('player ready', data => this._setLobby(data))
    socket.on('player won', data => this._win(data))
  }

  _win(data) {
    if (data.gameID === this.state.gameID) {
      if (this.state.player === +data.player) {
        alert('You Won')
      } else {
        alert('You Lost')
      }
    }
  }

  _setGameID(id, player) {
    this.setState({gameID: id})

    if (player === 'guest') {
      this.setState({player: 1})
      socket.emit('player ready', {gameID: id})
    } else {
      this.setState({player: 2})
    }
  }

  _setLobby(data) {
    if (data.gameID === this.state.gameID) {
      this.setState({
        isLobby: !this.state.isLobby
      })
    }
  }

  _titleColor() {
    const player = this.state.player
    if (player === 1)
      return {color: '#375A7F'}
    if (player === 2)
      return {color: '#00BC8C'}
    if (player === 0)
      return {color: 'white'}
    }

  _changeLobby(lobby) {
    const {gameID, player} = this.state
    if(lobby) {
      return <GameLobby setGameID={this._setGameID}/>
    } else {
      return <GameBoard gameID={gameID} player={player}/>
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-offset-2 col-md-8">
            <div className="gameBoard">
              <div className='title' style={this._titleColor()}>Gomoku</div>
              {this._changeLobby(this.state.isLobby)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
