<!-- src/components/NavBar.svelte -->
<script>
  import { user } from '../store/store.js'; // import the user store
  
  const navigate = (url) => {
    window.location.pathname = url;
    };

    async function logout() {
    const response = await fetch('http://localhost:8080/logout', {
    method: 'POST',
    credentials: 'include',
  });

  if (response.ok) {
    user.set(null); // Clear the user store on successful logout
    window.location.href = '/login'; // Redirect to login page
  } else {
    console.error('Logout failed');
  }
}


</script>
  
  <nav>
    <button on:click={() => navigate('/')}>Home</button>
    <button on:click={() => navigate('/about')}>About Us</button>
    <button on:click={() => navigate('/register')}>Register</button>
    <button on:click={() => navigate('/login')}>Login</button>
    <button on:click={logout}>Logout</button>

  </nav>

  {#if $user} <!-- This checks if $user is not null (i.e., the user is logged in) -->
  <button on:click={() => window.location.href='/profile'}>Profile</button>
{/if}

  <style>
    nav {
      padding: 8px;   
     }
    button {
      margin-right: 8px;
    }
  </style>
  