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
        this.printScoreBoard = function (scoreData) {
            var game = _this.getElement('#game');
            var scoreBoard = _this.createElement('div', 'score');
            game.append(scoreBoard);
            var playerOneScore = _this.createElement('div', 'x');
            playerOneScore.textContent = "Player 1: " + scoreData.x;
            playerOneScore.id = 'score-x';
            var playerTwoScore = _this.createElement('div', 'o');
            playerTwoScore.textContent = "Player 2: " + scoreData.o;
            playerTwoScore.id = 'score-o';
            scoreBoard.append(playerOneScore, playerTwoScore);
        };
    }
    return DOMDisplay;
}());
var TicTacToe = (function () {
    function TicTacToe(display) {
        this.display = display;
        this.board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ];
        this.score = { x: 0, o: 0 };
    }
    TicTacToe.prototype.startGame = function () {
        this.display.printScoreBoard(this.score);
        this.display.printGameBoard(this.board);
    };
    return TicTacToe;
}());
var tictactoe = new TicTacToe(new DOMDisplay());
tictactoe.startGame();
