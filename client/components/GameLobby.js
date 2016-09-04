import React, { Component } from 'react'

export default class GameLobby extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inLobby: true,
      join: false,
      create: false,
      code: ''
    }
  }

  _handleChange(event) {
    this.setState({code: event.target.value})
  }

  _genAccessCode() {
    const char = 'abcdefghijklmnopqrztuvwxyz1234567890'.split('')
    return [0,0,0,0].map(code => {
      return char[Math.floor(Math.random() * char.length)]
    }).join('')
  }


  _createGame() {
    const code = this._genAccessCode()
    // call backend
    return <h2>{`Access Code: ${code}`}</h2>
  }

  _joinGame() {
    return (
      <form >
        <div className="form-group">
          <input type="text" value={code} placeholder='Enter Access Code' onChange={this._handleChange}/>
        </div>
      </form>
    )
  }



  _lobby() {
    return (
      <div>
        <button type="button" class="btn btn-default" onClick={this._displayState(true, false)}>Join Game</button>
        <button type="button" class="btn btn-default" onClick={this._displayState(false, true)}>Create Game</button>
      </div>
    )
  }

  _displayState(join, create) {
    this.setState({
          inLobby: false,
          join: join,
          create: create
        })
  }

  _displayLogic() {
    const {inLobby, join, create} = this.state
    if(inLobby) return this._lobby()
    if(join) return this._joinGame()
    if(create) return this._createGame()
  }

  render() {
    return (
      <div>
        {this._displayLogic()}
      </div>
    )
  }
}
