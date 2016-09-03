import React, { Component } from 'react'

export default class GameTile extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  _handleOnClick() {
    //this.props.updatePlayerMove(this.props.id)
  }

  _tile(player) {
    if(player === 1) {
      return <a href="#" className="btn btn-primary" onClick={this._handleOnClick.bind(this)}></a>
    } else if (player === 2) {
      return <a href="#" className="btn btn-info"></a>
    } else {
      return <a href="#" className="btn btn-default"></a>
    }
  }

  render() {
    return (
      this._tile(this.props.player)
    )
  }
}
