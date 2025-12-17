<template>
  <div class="contenedor">

    <div class="estado">
      <span>Puntaje: {{ puntaje }}</span>
      <span>Intento: {{ intentos }}</span>
    </div>

    <div class="imagenes">
      <Casino ref="c1" :imagenInicial="imagenes[0]" :jugar="jugar" />
      <Casino ref="c2" :imagenInicial="imagenes[1]" :jugar="jugar" />
      <Casino ref="c3" :imagenInicial="imagenes[2]" :jugar="jugar" />
    </div>

    <button class="boton-jugar" @click="jugarPartida" :disabled="finJuego">
      JUGAR
    </button>

    <button @click="nuevoJuego">
      Nuevo Juego
    </button>

    <div v-if="gano" class="ganar">
      Puntaje: {{ puntaje }} <br />
      Felicitaciones has ganado $10.000,00
    </div>

    <div v-if="perdio" class="perder">
      Has utilizado tus 5 intentos <br />
      El juego ha terminado, inténtalo nuevamente
    </div>

  </div>
</template>

<script>
import Casino from "@/components/Casino.vue";

export default {
  components: { Casino },

  data() {
    return {
      imagenes: [
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg",
      ],
      jugar: false,
      puntaje: 0,
      intentos: 0,
      gano: false,
      perdio: false,
      finJuego: false,
    };
  },

  methods: {
    jugarPartida() {
      if (this.finJuego) return;

      this.jugar = false;
      this.$nextTick(() => {
        this.jugar = true;
      });

      this.intentos++;

      setTimeout(() => {
        this.calcularPuntaje();
      }, 1000);
    },

    calcularPuntaje() {
      const respuestas = [
        this.$refs.c1.textoActual,
        this.$refs.c2.textoActual,
        this.$refs.c3.textoActual,
      ];

      const yes = respuestas.filter(r => r === "yes").length;

      if (yes === 3) this.puntaje += 5;
      else if (yes === 2) this.puntaje += 2;
      else if (yes === 1) this.puntaje += 1;

      if (this.puntaje >= 10) {
        this.gano = true;
        this.finJuego = true;
      }

      if (this.intentos === 5 && this.puntaje < 10) {
        this.perdio = true;
        this.finJuego = true;
      }
    },

    nuevoJuego() {
      this.puntaje = 0;
      this.intentos = 0;
      this.gano = false;
      this.perdio = false;
      this.finJuego = false;
    },
  },
};
</script>

<style scoped>
.contenedor {
  width: 100%;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
}

.estado {
  display: flex;
  justify-content: space-between;
  margin: 20px 60px;
  font-size: 20px;
  font-weight: bold;
}

.imagenes {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 30px;
}

.boton-jugar {
  margin-top: 40px;
  padding: 15px 60px;
  font-size: 22px;
  font-weight: bold;
  border: 3px solid black;
  background-color: white;
  cursor: pointer;
}

.ganar {
  color: blue;
  margin-top: 20px;
  font-size: 18px;
}

.perder {
  color: red;
  margin-top: 20px;
  font-size: 18px;
}
</style>
