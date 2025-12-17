<template>
  <div class="carta">
    <img :src="imagen" alt="No se puede visualizar" />
    <p>{{ texto }}</p>
  </div>
</template>

<script>
export default {
  name: "PokemonCard",
  props: {
    imagen: {
      type: String,
      required: true, // Corregido 'required'
    },
    texto: {
      type: String,
      required: true, // Corregido 'required'
    },
  },

};
</script>

<style scoped>
/* Agrega estilos si quieres, ejemplo: */
.carta { margin: 10px; border: 1px solid black; }
img { width: 100px; height: 100px; }
</style>