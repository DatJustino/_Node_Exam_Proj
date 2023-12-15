<script>
	import { navigate } from "svelte-navigator";
	import { user } from '../store/store.js'; // Assuming this store contains user info

	function startWorkout() {
    if ($user.isLoggedIn) { // Assuming your user store has an isLoggedIn flag
      navigate('/tictactoe'); // Navigate to the TicTacToe route
    } else {
      navigate('/login'); // Navigate to the login route
    }
  }
</script>

<main>
	<h1>Welcome to the Workout Training App</h1>
	<button on:click={startWorkout}>Start Workout!</button>
</main>

<style>
	main {
		background-size: cover;
		background-position: center;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: white;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	}

	h1 {
		font-size: 4rem;
		margin-bottom: 2rem;
	}

	button {
		font-size: 2rem;
		padding: 1rem 2rem;
		background-color: #ffc107;
		border: none;
		border-radius: 5px;
		color: white;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
		cursor: pointer;
	}

	button:hover {
		background-color: #ff9800;
	}
</style>
