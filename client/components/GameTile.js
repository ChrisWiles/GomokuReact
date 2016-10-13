import React, {Component, PropTypes} from 'react'

class GameTile extends Component {
  constructor(props) {
    super(props)
    // bind your event handlers in the constructor so they are only bound once for every instance
    this._handleOnClick = this._handleOnClick.bind(this)
  }

  _handleOnClick() {
    const {isTurn, updatePlayerMove, id} = this.props
    if (isTurn) {
      updatePlayerMove(id)
    }
  }

  _tile(player) {
    if (player === 1) {
      return <a href="#" className="btn btn-primary btn-circle"/>
    } else if (player === 2) {
      return <a href="#" className="btn btn-success btn-circle"/>
    } else if (player === 'win') {
      return <a href="#" className="btn btn-danger btn-circle"/>
    } else {
      return <a href="#" className="btn btn-default btn-circle" onClick={this._handleOnClick}/>
    }
  }

  render() {
    return this._tile(this.props.player)
  }
}

GameTile.propTypes = {
  isTurn: PropTypes.bool.isRequired,
}

export default GameTile
