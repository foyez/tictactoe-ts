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
        this.getAllElements = function (selector) {
            return document.querySelectorAll(selector);
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
        this.updateBoard = function (row, col, currentPlayer) {
            var playerToken = _this.createElement('span', currentPlayer);
            playerToken.textContent = currentPlayer;
            var boardRow = _this.getElement("[data-row=\"" + row + "\"]");
            var cell = boardRow.querySelector("[data-col=\"" + col + "\"]");
            cell.append(playerToken);
        };
        this.clearGameBoard = function () {
            var cells = _this.getAllElements('.col');
            cells.forEach(function (cell) { return (cell.textContent = ''); });
        };
        this.printScoreBoard = function (scoreData) {
            var game = _this.getElement('#game');
            var scoreBoard = _this.createElement('div', 'score');
            game.append(scoreBoard);
            var playerOneScore = _this.createElement('div', 'x');
            var score1 = _this.createElement('span');
            score1.id = 'score-x';
            score1.textContent = "" + scoreData.x;
            playerOneScore.textContent = 'Player 1: ';
            playerOneScore.append(score1);
            var playerTwoScore = _this.createElement('div', 'o');
            var score2 = _this.createElement('span');
            score2.id = 'score-o';
            score2.textContent = "" + scoreData.o;
            playerTwoScore.textContent = 'Player 2: ';
            playerTwoScore.append(score2);
            scoreBoard.append(playerOneScore, playerTwoScore);
        };
        this.updateScore = function (currentScore, currentPlayer) {
            var currentPlayerScore = _this.getElement("#score-" + currentPlayer);
            var score = currentScore[currentPlayer];
            currentPlayerScore.textContent = "" + score;
        };
        this.printMessage = function (winner) {
            var message = _this.createElement('div', 'message');
            var player = winner === 'x' ? 'Player 1' : 'Player 2';
            message.textContent = winner ? player + " wins!" : 'Nobody wins!';
            var game = _this.getElement('#game');
            game.append(message);
        };
        this.clearMessage = function () {
            var message = _this.getElement('.message');
            message.remove();
        };
    }
    DOMDisplay.prototype.bindHandler = function (clickHandler) {
        document.addEventListener('click', function (e) {
            var clicked = e.target;
            var isColumn = clicked.className === 'col';
            if (isColumn) {
                var cell = clicked;
                var row = +cell.parentElement.dataset.row;
                var col = +cell.dataset.col;
                clickHandler(row, col);
            }
        });
    };
    return DOMDisplay;
}());
var TicTacToe = (function () {
    function TicTacToe(display) {
        var _this = this;
        this.clickCell = function (row, col) {
            var canContinue = _this.board[row][col] === '';
            if (canContinue && !_this.waiting) {
                _this.display.updateBoard(row, col, _this.currentPlayer);
            }
        };
        this.emptyBoard = function () { return [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ]; };
        this.display = display;
        this.board = this.emptyBoard();
        this.players = { x: 'X', o: 'O' };
        this.score = { x: 0, o: 0 };
        this.wait = 1500;
        this.waiting = false;
        this.currentPlayer = this.players.x;
        this.display.bindHandler(this.clickCell);
    }
    TicTacToe.prototype.startGame = function () {
        this.display.printScoreBoard(this.score);
        this.display.printGameBoard(this.board);
    };
    return TicTacToe;
}());
var tictactoe = new TicTacToe(new DOMDisplay());
tictactoe.startGame();
