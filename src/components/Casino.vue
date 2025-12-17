<template>
  <div class="carta">
    <img :src="imagenActual" alt="Imagen" />
    <p>{{ textoActual }}</p>
  </div>
</template>

<script>
import { consumirApiFacade } from "@/client/YesNoClient";

export default {
  props: {
    imagenInicial: {
      type: String,
      required: true,
    },
    jugar: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      imagenActual: this.imagenInicial,
      textoActual: "XXXXXXXXXX",
    };
  },

  watch: {
    jugar(valor) {
      if (valor) {
        this.consumir();
      }
    },
  },

  methods: {
    async consumir() {
      const res = await consumirApiFacade();
      this.imagenActual = res.image;
      this.textoActual = res.answer;
    },
  },
};
</script>

<style scoped>
.carta {
  text-align: center;
}

.carta img {
  width: 180px;
}

.carta p {
  margin-top: 15px;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 2px;
}
</style>
