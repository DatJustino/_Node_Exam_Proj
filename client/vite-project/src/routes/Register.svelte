<script>
	let email = "";
	let password = "";
	let message = "";

	async function register() {
		const response = await fetch("http://localhost:8080/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});

		message = await response.text();
	}
</script>

<form on:submit|preventDefault={register}>
	<input type="email" bind:value={email} placeholder="Email" />
	<input type="password" bind:value={password} placeholder="Password" />
	<button type="submit">Register</button>
</form>

<p>{message}</p>
