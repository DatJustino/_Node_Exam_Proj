
<script>
    import { user } from '../store/store.js'; // import the user store

    let email = '';
    let password = '';
    let message = '';

    async function login() {
        
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        });

        const data = await response.text();

if (response.ok) {
    user.set({ email: email }); // Set the user store with the logged-in user's email
    message = 'Login successful';
    // Redirect to profile or home page if needed
    window.location.href = '/profile';
} else {
    message = data; // Display error message from the server
    user.set(null); // Ensure the user store is null if login fails
}
}
    
</script>

<form on:submit|preventDefault={login}>
    <input type="email" bind:value={email} placeholder="Email" />
    <input type="password" bind:value={password} placeholder="Password" />
    <button type="submit">Login</button>
</form>

<p>{message}</p>
