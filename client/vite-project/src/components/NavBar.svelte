<!-- src/components/NavBar.svelte -->
<script>
  import { user } from '../store/store.js'; // import the user store
  import { navigate, Link } from 'svelte-navigator';
  import './navbar.css'; // Import the CSS file
  const cookieName = 'sid';
const cookieValue = 'NODEJS';
const expires = new Date().toUTCString(); // Set the expiration date to a past date


  async function logout() {
    const response = await fetch('http://localhost:8080/logout', {
      method: 'POST',
      credentials: 'include',
    });

    if (response.ok) {
      document.cookie = `${cookieName}=${cookieValue};expires=${expires};path=/`; // Set the cookie to expire
      sessionStorage.clear();
      user.set(null); 
      navigate('/') ; 
    } else {
      console.error('Logout failed');
    }
  }
</script>

<nav class="navbar">
  <Link to="/">Home</Link>
  <Link to="/aboutUs">About Us</Link>

  {#if !$user}
    <Link to="/register">Register</Link>
    <Link to="/login">Login</Link>
  {:else}
    <Link to="/profile">Profile</Link>
    <button class="logout" on:click={logout}>Logout</button>
  {/if}
</nav>
