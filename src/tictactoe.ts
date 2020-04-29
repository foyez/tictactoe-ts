// =======================================
// Custom Types
// =======================================

interface PlayerToken {
  o: string
  x: string
  [key: string]: string
}

interface Score {
  x: number
  o: number
  [key: string]: number
}

interface Display {
  bindHandler(clickHandler: (row: number, col: number) => void): void
  createElement(tag: string, className?: string, dataset?: any[]): HTMLElement
  getElement(selector: string): HTMLElement
  getAllElements(selector: string): NodeList
  printGameBoard(boardData: string[][]): void
  updateBoard(row: number, col: number, currentPlayer: string): void
  clearGameBoard(): void
  printScoreBoard(scoreData: Score): void
  updateScore(currentScore: Score, currentPlayer: string): void
  printMessage(winner: string): void
  clearMessage(): void
}

// =======================================
// Display
// =======================================

class DOMDisplay implements Display {
  /**
   * Bind document click to the game if clicked element is a cell
   * @param {requestCallback} clickHandler
   */
  bindHandler(clickHandler: (row: number, col: number) => void): void {
    document.addEventListener('click', (e: Event) => {
      const clicked = <HTMLElement>e.target
      const isColumn = clicked.className === 'col'

      if (isColumn) {
        const cell = clicked
        const row: number = +cell.parentElement!.dataset.row!
        const col: number = +cell.dataset.col!

        clickHandler(row, col)
      }
    })
  }

  /**
   * Create an element and apply an optional class and dataset
   * @param {string} tag
   * @param {string} className (optional)
   * @param {Object[]} dataset (optional)
   * @return {HTMLElement}
   */
  createElement = (
    tag: string,
    className?: string,
    dataset?: any[],
  ): HTMLElement => {
    const element = document.createElement(tag)
    if (className) element.classList.add(className)
    if (dataset) element.dataset[dataset[0]] = dataset[1]

    return element
  }

  /**
   * Retrieve an existing element in the DOM
   * @param {string} selector
   * @return {HTMLElement}
   */
  getElement = (selector: string): HTMLElement =>
    <HTMLElement>document.querySelector(selector)

  /**
   * Retrieve all elements by selector from the DOM
   * @param {string} selector
   * @return {NodeList}
   */
  getAllElements = (selector: string): NodeList =>
    <NodeList>document.querySelectorAll(selector)

  /**
   * Create the game board view and render it to the DOM
   * @param {Object[]} boardData 3x3 multi-dimensional array of empty strings
   */
  printGameBoard = (boardData: string[][]): void => {
    const game = this.getElement('#game')
    const gameBoard = this.createElement('div', 'board')

    game.append(gameBoard)

    boardData.forEach((row, i) => {
      const boardRow = this.createElement('div', 'row', ['row', i])
      gameBoard.append(boardRow)

      row.forEach((col, j) => {
        const boardCol = this.createElement('div', 'col', ['col', j])
        boardRow.append(boardCol)
      })
    })
  }

  /**
   * Update the board by appending a player token to a cell
   * @param {number} row
   * @param {number} col
   * @param {string} currentPlayer
   */
  updateBoard = (row: number, col: number, currentPlayer: string): void => {
    const playerToken = this.createElement('span', currentPlayer)
    playerToken.textContent = currentPlayer

    const boardRow = this.getElement(`[data-row="${row}"]`)
    const cell = <HTMLElement>boardRow.querySelector(`[data-col="${col}"]`)

    cell.append(playerToken)
  }

  /**
   * Set empty stings to all cells in the board
   */
  clearGameBoard = (): void => {
    const cells = this.getAllElements('.col')

    cells.forEach((cell) => (cell.textContent = ''))
  }

  /**
   * Create the score board view and render it to the DOM
   * @param {Score} scoreData
   */
  printScoreBoard = (scoreData: Score): void => {
    const game = this.getElement('#game')
    const scoreBoard = this.createElement('div', 'score')

    game.append(scoreBoard)

    const playerOneScore = this.createElement('div', 'x')
    const score1 = this.createElement('span')
    score1.id = 'score-x'
    score1.textContent = `${scoreData.x}`
    // playerOneScore.id = 'score-x'
    playerOneScore.textContent = 'Player 1: '
    playerOneScore.append(score1)

    const playerTwoScore = this.createElement('div', 'o')
    const score2 = this.createElement('span')
    score2.id = 'score-o'
    score2.textContent = `${scoreData.o}`
    // playerOneScore.id = 'score-x'
    playerTwoScore.textContent = 'Player 2: '
    playerTwoScore.append(score2)

    scoreBoard.append(playerOneScore, playerTwoScore)
  }

  /**
   * Update the existing score for the current player
   * @param {Score} currentScore
   * @param {string} currentPlayer
   */
  updateScore = (currentScore: Score, currentPlayer: string): void => {
    const currentPlayerScore = this.getElement(`#score-${currentPlayer}`)
    const score: number = currentScore[currentPlayer]
    currentPlayerScore.textContent = `${score}`
  }

  /**
   * Print the win, lose, or stalemate message
   * @param {string} winner
   */
  printMessage = (winner: string): void => {
    const message = this.createElement('div', 'message')
    const player = winner === 'x' ? 'Player 1' : 'Player 2'

    message.textContent = winner ? `${player} wins!` : 'Nobody wins!'

    const game = this.getElement('#game')
    game.append(message)
  }

  /**
   * Clear message from the screen
   */
  clearMessage = (): void => {
    const message = this.getElement('.message')
    message.remove()
  }
}

class TicTacToe {
  display: Display
  board: string[][]
  players: PlayerToken
  score: Score
  wait: number
  waiting: boolean
  currentPlayer: string

  constructor(display: Display) {
    this.display = display
    this.board = this.emptyBoard()
    this.players = { x: 'X', o: 'O' }
    this.score = { x: 0, o: 0 }
    this.wait = 1500
    this.waiting = false
    this.currentPlayer = this.players.x

    this.display.bindHandler(this.clickCell)
  }

  /**
   * Click a cell in the game board and determine if
   * - its a win, a stalemate, or the game continues
   * - Game over or switch player
   */
  clickCell = (row: number, col: number): void => {
    const canContinue = this.board[row][col] === ''

    if (canContinue && !this.waiting) {
      this.display.updateBoard(row, col, this.currentPlayer)
    }
  }

  /**
   * Create a new empty board
   * @return {Object[]} 3x3 multi-dimensional array of empty strings
   */
  emptyBoard = (): string[][] => [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]

  /**
   * Render score board and game board
   */
  startGame(): void {
    this.display.printScoreBoard(this.score)
    this.display.printGameBoard(this.board)
  }
}

// =======================================
// Start Game
// =======================================
const tictactoe = new TicTacToe(new DOMDisplay())
tictactoe.startGame()
