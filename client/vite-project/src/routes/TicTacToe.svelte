<script>
	import { onMount } from "svelte";
	import { navigate } from "svelte-navigator";
  import { user } from '../store/store.js'; // Assuming this store contains user info

	import io from "socket.io-client";
	let socket;
	let board = Array(9).fill(null); // Initialize board with null values
	let currentTurn;
	let winner = null;
	let isDraw = false;
	onMount(() => {
    if (!$user) { // If the user is not logged in, redirect them
      navigate('/login');
    } else {
    startNewGame();
    }
		socket = io("http://localhost:8080");
		const sessionId = "some-session-id";

		socket.emit("joinGame", sessionId);

		socket.on("gameUpdate", (update) => {
			board = update.board;
			currentTurn = update.turn;
			winner = update.winner;
			isDraw = update.draw;

			// If a new session ID is provided, handle it accordingly
			if (update.sessionId) {
				// Example: Store the new session ID or update UI
				console.log("New game session ID:", update.sessionId);
			}
		});
	});

	const startNewGame = () => {
		socket.emit("startNewGame");
	};

  const makeMove = (position) => {
    if (board[position] === null && !winner && !isDraw) {
      socket.emit('makeMove', position);
    }
  };

	function displayStatus() {
		if (winner) {
			return `${winner} wins!`;
		} else if (isDraw) {
			return "It's a draw!";
		}
		return "";
	}
</script>

{#if winner || isDraw}
	<p class="status">{displayStatus()}</p>
	<button on:click={startNewGame}>Start New Game</button>
	<button on:click={() => navigate("/profile")}>Return to Profile</button>
{/if}

<div class="tic-tac-toe-board">
	{#each board as cell, position}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="cell" on:click={() => makeMove(position)}>
			{cell}
		</div>
	{/each}
</div>

<style>
  .tic-tac-toe-board {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .cell {
    width: 60px;
    height: 60px;
    border: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
</style>