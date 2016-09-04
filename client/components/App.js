import React, { Component } from 'react'
import GameBoard from './GameBoard'
import GameLobby from './GameLobby'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLobby: true
    }
  }

  render() {
    return (
      <div className="container">
          <div className="row">
              <div className="col-md-offset-2 col-md-8">
                <div className='title'>Gomoku</div>
                {/* <div className='subTitle'>Tic-Tac-Toe get 5 in a row</div> */}
                <div className="gameBoard"><GameBoard/></div>
              </div>
          </div>
      </div>
    )
  }
}
