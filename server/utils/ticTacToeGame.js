class TicTacToeGame {
	constructor() {
		this.board = Array(9).fill(null); // 3x3 board represented as a flat array
		this.currentTurn = "X"; // X or O
		this.winner = null; // 'X', 'O', or null
	}

	makeMove(position) {
		if (this.isMoveValid(position)) {
			this.board[position] = this.currentTurn;
			this.checkGameStatus();
			this.toggleTurn();
		}
	}

	checkForWin() {
		const lines = [
			[0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
			[0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
			[0, 4, 8], [2, 4, 6]             // Diagonals
		];
	
		for (let line of lines) {
			const [a, b, c] = line;
			if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
				this.winner = this.board[a];
				return this.winner;
			}
		}
		
		return null;
	}
    isDraw() {
        return this.board.every(cell => cell !== null) && !this.checkForWin();
      }
	isMoveValid(position) {
		return this.board[position] === null;
	}
	checkGameStatus() {
		const winner = this.checkForWin();
		if (winner) {
			this.winner = winner;
			// Notify the client about the win
			return { gameOver: true, winner: this.winner, draw: false };
		} else if (this.isDraw()) {
			// If it's a draw, reset the game
			this.resetGame();
			return { gameOver: true, winner: null, draw: true };
		}
		// Continue the game
		return { gameOver: false, winner: null, draw: false };
	}
	
	resetGame() {
		this.board = Array(9).fill(null);
		this.currentTurn = "X"; // Or choose randomly or alternate
		this.winner = null;
	}
	getBoard() {
		return this.board;
	}

	toggleTurn() {
		this.currentTurn = this.currentTurn === "X" ? "O" : "X";
	}
	// Additional methods as needed...
}

function getAIMove(board) {
	// Implement AI logic here
	// For now, let's return a random available position
	const availablePositions = board
		.map((cell, index) => (cell === null ? index : null))
		.filter((cell) => cell !== null);

	return availablePositions[
		Math.floor(Math.random() * availablePositions.length)
	];
}
export default TicTacToeGame;
