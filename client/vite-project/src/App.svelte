<script>
  import Register from './routes/Register.svelte';
  import Login from './routes/Login.svelte';
  import Router from './Router.svelte';
  import NavBar from './components/NavBar.svelte';
  import Footer from './components/Footer.svelte';
</script>

<div id="app">
  <NavBar />
  <Router />
  <Footer />
</div>

<main>
  <h1>Welcome</h1>
  <Register />
  <Login />
</main>