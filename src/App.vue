<template>
  <ExamenPage />
</template>

<script>
import CasinoView from './views/CasinoView.vue';
import PokemonView from './views/PokemonView.vue';
import PreguntaView from './views/PreguntaView.vue';
import ExamenPage from './views/ExamenPage.vue'

export default {
  name: "App",
  components: {
    PreguntaView,
    CasinoView,
    PokemonView,
    ExamenPage,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
