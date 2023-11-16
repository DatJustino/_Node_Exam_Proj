<script>
  import { onMount } from 'svelte';
  import { user } from '../store/store.js'; // import the user store

    let isVisible = false;
    $: isVisible = $user !== null; // The button is visible only when the user is logged in
    
    onMount(() => {
    if (!$user) { // If no user is logged in
      window.location.href = '/login'; // Redirect to login page
    }
  });
</script>

{#if isVisible}
    <button on:click={() => window.location.href='/profile'}>Profile</button>
{/if}
