function isWin(board, player) {

  // vertical, horizontal, diagonal each create a string from P1 & P2 tile values
  // a 0 value is inserted after each row to create a break
  // regex then checks for 5 in a row
  const b = []
  board.forEach(ele => b.push(...ele))

  const rows = 'ABCDEFGHIJKLMNO'.split('')
  const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

  function horizontal(b, player) {
    const Row = []
    rows.forEach(char => {
      b.forEach(item => {
        if(item.id.slice(0, 1) === char) {
          Row.push(item.player.toString())
        }
      })
      Row.push('0')
    })
    return /(1{5,5})|(2{5,5})/.test(Row.join(''))
  }

  function vertical(b, player) {
    const Col = []
    cols.forEach(char => {
      b.forEach(item => {
        if(+item.id.slice(1) === char) {
          Col.push(item.player.toString())
        }
      })
      Col.push('0')
    })
    return /(1{5,5})|(2{5,5})/.test(Col.join(''))
  }

  function diagonal(board, player) {
    const diagonals = []
    for(let i = 0; i < board.length; i++) {
      const diagonal = []
      for(let j = 0; j < board[i].length; j++) {
        diagonal.push(board[i][j].player)
      }
      diagonals.push(diagonal)
    }

    function getDiagonals(array, bottomToTop) {
      let Ylength = array.length
      let Xlength = array[0].length
      let maxLength = Math.max(Xlength, Ylength)
      let temp
      let returnArray = []
      for(let k = 0; k <= 2 * (maxLength - 1); ++k) {
        temp = []
        for(let y = Ylength - 1; y >= 0; --y) {
          let x = k - (bottomToTop ? Ylength - y : y)
          if(x >= 0 && x < Xlength) {
            temp.push(array[y][x])
          }
        }
        if(temp.length > 0) {
          returnArray.push(temp.join(''))
        }
      }
      return returnArray;
    }

    const diagonalsRight = getDiagonals(diagonals, true)
    const diagonalsLeft = getDiagonals(diagonals, false)
    const d = []

    diagonalsRight.forEach(ele => {
      d.push(...ele, '0')
    })
    diagonalsLeft.forEach(ele => {
      d.push(...ele, '0')
    })
    return /(1{5,5})|(2{5,5})/.test(d.join(''))
  }

  if(horizontal(b, player) || vertical(b, player) || diagonal(board, player)) {
    return true
  } else {
    return false
  }
}

export default isWin
