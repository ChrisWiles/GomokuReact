function initializeBoard() {
  const board = []
  const rows = 'ABCDEFGHIJKLMNO'.split('')
  const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

  rows.forEach(row => {
    const Row = []
    cols.forEach(col => {
      Row.push({
        id: row + col,
        player: 0
      })
    })
    board.push(Row)
  })

  return board
}

export default initializeBoard
