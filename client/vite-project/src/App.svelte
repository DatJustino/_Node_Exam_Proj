<script>
  import { Router, Route } from 'svelte-navigator';
  import NavBar from './components/NavBar.svelte';
  import Footer from './components/Footer.svelte';
  import Home from './routes/Home.svelte';
  import AboutUs from './routes/AboutUs.svelte';
  import Register from './routes/Register.svelte';
  import Login from './routes/Login.svelte';
  import Profile from './routes/Profile.svelte';
  import { Toaster } from 'svelte-french-toast';
  import TicTacToe from './routes/TicTacToe.svelte';

</script>

<Toaster />


<div id="app">
  <Router>
  <TicTacToe />
  <NavBar />
    <Route path="/" component={Home} />
    <Route path="/aboutUs" component={AboutUs} />
    <Route path="register" component={Register} />
    <Route path="login" component={Login} />
    <Route path="profile" component={Profile} />
  <Footer />
</Router>
</div>