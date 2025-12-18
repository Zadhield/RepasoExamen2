<template>
  <div class="container">
    <img :src="imagen" alt="No se puede visualizar" />
    <p>{{ texto }}</p>
  </div>
</template>

<script>
export default {
  props: {
    imagen:{
        type:String,
        required:true,
    },
    texto:{
        type:String,
        required:true,
    },
  },
};
</script>

<style scoped>
.container{
    display: flex;
    /* AGREGADO: Para que el texto salga DEBAJO de la imagen */
    flex-direction: column; 
    align-items: center;
    border: 1px solid black;
    margin: 10px; /* Separación entre cartas */
}
img {
    width: 200px; /* Tamaño fijo para que no se deforme */
    height: 200px;
}
</style>