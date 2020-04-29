// =======================================
// Custom Types
// =======================================

interface PlayerProps {
  x: string
  o: string
  [key: string]: string
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
}

const domDisplay = new DOMDisplay()
domDisplay.printGameBoard([
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
])
