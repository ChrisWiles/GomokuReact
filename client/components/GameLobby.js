import React, { Component } from 'react'

export default class GameLobby extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chooseGame: true,
      join: false,
      create: false,
      code: ''
    }
  }

  _handleChange(event) {
    this.setState({code: event.target.value})
    console.log(this.state.code)
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

  _handleOnSubmit(event) {
    event.preventDefault()
    console.log("Code: ", this.state.code)
    this.setState({code: ''})
  }

  _joinGame() {
    return (
      <form onSubmit={this._handleOnSubmit.bind(this)}>
        <div className="form-group">
          <input type="text" value={this.state.code} placeholder='Enter Access Code' onChange={this._handleChange.bind(this)}/>
        </div>
      </form>
    )
  }

  _handleOnClick() {

  }


  _chooseGame() {
    return (
      <div>
        <button type="button" className="btn btn-default" onClick={this._displayState.bind(this, true, false)}>Join Game</button>
        <button type="button" className="btn btn-default" onClick={this._displayState.bind(this, false, true)}>Create Game</button>
      </div>
    )
  }

  _displayState(join, create) {
    console.log('clicked')
    this.setState({
          chooseGame: false,
          join: join,
          create: create
        })
  }

  _displayLogic() {
    const {chooseGame, join, create} = this.state
    if(chooseGame) return this._chooseGame()
    if(join) return this._joinGame()
    if(create) return this._createGame()
  }

  render() {
    return (
      <div className="text-center">
        {this._displayLogic()}
      </div>
    )
  }
}
