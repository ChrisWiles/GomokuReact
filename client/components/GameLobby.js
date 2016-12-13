import React, {Component, PropTypes} from 'react'

class GameLobby extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chooseGame: true,
      join: false,
      create: false,
      code: ''
    }
    // bind your event handlers in the constructor so they are only bound once for every instance
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({code: event.target.value})
  }

  genAccessCode() {
    const char = 'abcdefghijklmnopqrztuvwxyz1234567890'.split('')
    return [0, 0, 0, 0].map(code => {
      return char[Math.floor(Math.random() * char.length)]
    }).join('')
  }

  createGame() {
    return <h2>{`Access Code: ${this.state.code}`}</h2>
  }

  handleOnSubmit(event) {
    event.preventDefault()
    this.props.setGameID(this.state.code, 'guest')
    this.setState({code: ''})
  }

  joinGame() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <div className="form-group">
          <input type="text" value={this.state.code} placeholder='Enter Access Code' onChange={this.handleChange}/>
        </div>
      </form>
    )
  }

  chooseGame() {
    return (
      <div>
        <button type="button" className="btn btn-default" onClick={this.displayState.bind(this, true, false)}>Join Game</button>
        <button type="button" className="btn btn-default" onClick={this.displayState.bind(this, false, true)}>Create Game</button>
      </div>
    )
  }

  displayState(join, create) {
    this.setState({chooseGame: false, join: join, create: create})
    if (create) {
      const code = this.genAccessCode()
      this.setState({code: code})
      this.props.setGameID(code, 'host')
    }
  }

  displayLogic() {
    const {chooseGame, join, create} = this.state
    if (chooseGame)
      return this.chooseGame()
    if (join)
      return this.joinGame()
    if (create)
      return this.createGame()
  }

  render() {
    return (
      <div className="text-center">
        {this.displayLogic()}
      </div>
    )
  }
}



GameLobby.propTypes = {
  setGameID: PropTypes.func.isRequired
}

export default GameLobby
