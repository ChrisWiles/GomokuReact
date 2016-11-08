import React, {Component, PropTypes} from 'react'

const GameTile = ({isTurn, updatePlayerMove, id, player}) => {

  const handleOnClick = () => isTurn && updatePlayerMove(id)

  if (player === 1) {
    return <a href="#" className="btn btn-primary btn-circle"/>
  } else if (player === 2) {
    return <a href="#" className="btn btn-success btn-circle"/>
  } else if (player === 'win') {
    return <a href="#" className="btn btn-danger btn-circle"/>
  } else {
    return <a href="#" className="btn btn-default btn-circle" onClick={handleOnClick}/>
  }
}

GameTile.propTypes = {
  isTurn: PropTypes.bool.isRequired,
  updatePlayerMove: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
}

export default GameTile
