// =======================================
// Custom Types
// =======================================

interface Score {
  x: number
  o: number
  [key: string]: number
}

interface Display {
  createElement(tag: string, className?: string, dataset?: any[]): HTMLElement
  getElement(selector: string): HTMLElement
  printGameBoard(boardData: string[][]): void
  printScoreBoard(scoreData: Score): void
}

// =======================================
// Display
// =======================================

class DOMDisplay {
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
   * Create the score board view and render it to the DOM
   * @param {Score} scoreData
   */
  printScoreBoard = (scoreData: Score): void => {
    const game = this.getElement('#game')
    const scoreBoard = this.createElement('div', 'score')

    game.append(scoreBoard)

    const playerOneScore = this.createElement('div', 'x')
    playerOneScore.textContent = `Player 1: ${scoreData.x}`
    playerOneScore.id = 'score-x'

    const playerTwoScore = this.createElement('div', 'o')
    playerTwoScore.textContent = `Player 2: ${scoreData.o}`
    playerTwoScore.id = 'score-o'

    scoreBoard.append(playerOneScore, playerTwoScore)
  }
}

class TicTacToe {
  display: Display
  board: string[][]
  score: Score

  constructor(display: Display) {
    this.display = display
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]
    this.score = { x: 0, o: 0 }
  }

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
