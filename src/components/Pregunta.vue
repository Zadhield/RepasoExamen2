<template>
  <div class="view-container">
    <img v-if="imagen" :src="imagen" alt="No se puede visualizar" />
    <div class="oscuro"></div>
    <div class="pregunta-container">
      <h1>Pregunta</h1>
      <input v-model="pregunta" type="text" placeholder="Hazme una pregunta" />
      <p>Recuerda terminar con el signo de interrogacion (?)</p>
      <h2>{{ pregunta }}</h2>
      <h2>{{ respuesta }}</h2>
    </div>
  </div>
</template>

<script>
import { consumirApiFacade } from "@/client/YesNoClient";
export default {
  data() {
    return {
      pregunta: null,
      respuesta: null,
      imagen: null,
    };
  },
  watch: {
    pregunta(value, oldvalue) {
      if (value.includes("?")) {
        this.respuesta = "Pensando";
        this.consumir();
      }
    },
  },
  methods: {
    async consumir() {
      const res = await consumirApiFacade();
      console.log("Respuesta final");
      console.log(res);
      console.log(res.answer);
      this.respuesta = res.answer;
      this.imagen = res.imagen;
    },
  },
};
</script>

<style>
</style>