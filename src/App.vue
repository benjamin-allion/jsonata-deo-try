<template>
  <div id="app">
    <Dashboard></Dashboard>
    <Ribbon></Ribbon>
  </div>
</template>

<script>
import Dashboard from './components/Dashboard.vue';
import Ribbon from './components/Ribbon.vue';

export default {
  name: 'App',
  components: {
    Ribbon,
    Dashboard,
  },
};
</script>

<style>
  html, body, #app {height: 100%; margin: 0;}
</style>
