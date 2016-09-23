import React, {Component} from 'react'

export default class GameLobby extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chooseGame: true,
      join: false,
      create: false,
      code: ''
    }
    // bind your event handlers in the constructor so they are only bound once for every instance
    this._handleOnSubmit = this._handleOnSubmit.bind(this)
    this._handleChange = this._handleChange.bind(this)
  }

  _handleChange(event) {
    this.setState({code: event.target.value})
  }

  _genAccessCode() {
    const char = 'abcdefghijklmnopqrztuvwxyz1234567890'.split('')
    return [0, 0, 0, 0].map(code => {
      return char[Math.floor(Math.random() * char.length)]
    }).join('')
  }

  _createGame() {
    return <h2>{`Access Code: ${this.state.code}`}</h2>
  }

  _handleOnSubmit(event) {
    event.preventDefault()
    this.props.setGameID(this.state.code, 'guest')
    this.setState({code: ''})
  }

  _joinGame() {
    return (
      <form onSubmit={this._handleOnSubmit}>
        <div className="form-group">
          <input type="text" value={this.state.code} placeholder='Enter Access Code' onChange={this._handleChange}/>
        </div>
      </form>
    )
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
    this.setState({chooseGame: false, join: join, create: create})
    if (create) {
      const code = this._genAccessCode()
      this.setState({code: code})
      this.props.setGameID(code, 'host')
    }
  }

  _displayLogic() {
    const {chooseGame, join, create} = this.state
    if (chooseGame)
      return this._chooseGame()
    if (join)
      return this._joinGame()
    if (create)
      return this._createGame()
  }

  render() {
    return (
      <div className="text-center">
        {this._displayLogic()}
      </div>
    )
  }
}
