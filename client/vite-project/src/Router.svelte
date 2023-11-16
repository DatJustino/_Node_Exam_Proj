<script>
    import Home from './routes/Home.svelte';
    import AboutUs from './routes/AboutUs.svelte';
    import Register from './routes/Register.svelte';
    import Login from './routes/Login.svelte';
  
    let currentRoute = window.location.pathname;
  
    $: Component = {
      '/': Home,
      '/about': AboutUs,
      '/register': Register,
      '/login': Login,
    }[currentRoute] || Home;
  </script>
  
  <svelte:component this={Component} />