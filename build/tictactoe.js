"use strict";
var DOMDisplay = (function () {
    function DOMDisplay() {
        var _this = this;
        this.createElement = function (tag, className, dataset) {
            var element = document.createElement(tag);
            if (className)
                element.classList.add(className);
            if (dataset)
                element.dataset[dataset[0]] = dataset[1];
            return element;
        };
        this.getElement = function (selector) {
            return document.querySelector(selector);
        };
        this.printGameBoard = function (boardData) {
            var game = _this.getElement('#game');
            var gameBoard = _this.createElement('div', 'board');
            game.append(gameBoard);
            boardData.forEach(function (row, i) {
                var boardRow = _this.createElement('div', 'row', ['row', i]);
                gameBoard.append(boardRow);
                row.forEach(function (col, j) {
                    var boardCol = _this.createElement('div', 'col', ['col', j]);
                    boardRow.append(boardCol);
                });
            });
        };
    }
    return DOMDisplay;
}());
var domDisplay = new DOMDisplay();
domDisplay.printGameBoard([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
]);
