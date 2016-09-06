import React, { Component } from 'react'

export default class GameTile extends Component {

  _handleOnClick() {
    if(this.props.isTurn) {
      this.props.updatePlayerMove(this.props.id)
    }
  }

  _tile(player) {
    if(player === 1) {
      return <a href="#" className="btn btn-primary btn-circle"/>
    } else if (player === 2) {
      return <a href="#" className="btn btn-success btn-circle"/>
    } else if (player === 'win'){
      return <a href="#" className="btn btn-danger btn-circle"/>
    } else {
      return <a href="#" className="btn btn-default btn-circle" onClick={this._handleOnClick.bind(this)}/>
    }
  }

  render() {
    return (
      this._tile(this.props.player)
    )
  }
}
