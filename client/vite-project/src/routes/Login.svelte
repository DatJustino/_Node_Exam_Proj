<script>
	import { user } from "../store/store.js"; // import the user store
	import { navigate } from "svelte-navigator";

	let email = "";
	let password = "";
	let message = "";

	async function login() {
		const response = await fetch("http://localhost:8080/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
			credentials: "include",
		});

		if (response.ok) {
			const data = await response.json();
			user.set(data.user);
			sessionStorage.setItem("user", JSON.stringify(data.user));
			navigate("/profile");
		} else {
			const errorText = await response.text();
			message = errorText;
			user.set(null);
		}
	}
</script>

<form on:submit|preventDefault={login}>
	<input type="email" bind:value={email} placeholder="Email" />
	<input type="password" bind:value={password} placeholder="Password" />
	<button type="submit">Login</button>
</form>

<p>{message}</p>
