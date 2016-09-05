import React, { Component } from 'react'
import GameBoard from './GameBoard'
import GameLobby from './GameLobby'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLobby: true,
      gameID: null
    }
  }

  componentDidMount() {
    socket.on('player ready', data => this._setLobby(data))
  }

  _setGameID(id, player) {
    this.setState({gameID: id})
    if(player === 'guest') {
      socket.emit('player ready', {gameID: id})      
    }
  }

  _setLobby(data) {
    console.log(this.state.gameID, data.gameID)
    if(data.gameID === this.state.gameID) {
        this.setState({isLobby: !this.state.isLobby})
    }
  }

  render() {
    return (
      <div className="container">
          <div className="row">
              <div className="col-md-offset-2 col-md-8">
                {/* <div className='subTitle'>Tic-Tac-Toe get 5 in a row</div> */}
                <div className="gameBoard">
                  <div className='title'>Gomoku</div>
                  {
                    this.state.isLobby
                    ?
                    <GameLobby setGameID={this._setGameID.bind(this)}/>
                    :
                    <GameBoard />
                  }
                </div>
              </div>
          </div>
      </div>
    )
  }
}
