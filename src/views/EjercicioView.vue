<template>
  <div class="main-container">
    <div v-if="intentos >= 5 && puntaje < 10" class="perdiste">
      <h1>Has utilizado tus 5 intentos</h1>
      <h1>El juego ha terminado</h1>
      <button @click="reiniciar">Nuevo Juego</button>
    </div>

    <div v-else-if="puntaje >= 10" class="mensaje-azul">
      <h2>Felicitaciones has ganado...</h2>
      <h2>Puntaje: {{ puntaje }}</h2>
      <button @click="reiniciar">Nuevo Juego</button>
    </div>

    <div v-else>
      <h2>Puntaje: {{ puntaje }} | Intentos: {{ intentos }}</h2>

      <div class="fila-cartas">
        <Ejercicio
          v-for="(opcion, index) in opciones"
          :key="index"
          :imagen="opcion.imagen"
          :texto="opcion.texto"
        />
      </div>

      <button class="btn-jugar" @click="jugar">JUGAR</button>
    </div>
  </div>
</template>

<script>
import { consumirApiPokemonFachada } from "@/client/Pokemon";
import Ejercicio from "@/components/Ejercicio.vue";

export default {
  components: {
    Ejercicio,
  },

  data() {
    return {
      puntaje: 0,
      intentos: 0,
      pokemons: [1, 2, 3, 4, 5], // IDs posibles
      opciones: [
        { imagen: "https://via.placeholder.com/250", texto: "XXXXXXXXXX" },
        { imagen: "https://via.placeholder.com/250", texto: "XXXXXXXXXX" },
        { imagen: "https://via.placeholder.com/250", texto: "XXXXXXXXXX" },
      ],
    };
  },

  // FALTABA TODA ESTA SECCIÓN
  methods: {
    async jugar() {
      this.intentos++;

      // Array temporal para guardar los IDs y calcular puntaje
      const idsEnMesa = [];

      for (let i = 0; i < 3; i++) {
        // 1. Elegimos ID al azar (Usando tu variable 'pokemons' que tiene [1,2,3,4,5])
        const randomId =
          this.pokemons[Math.floor(Math.random() * this.pokemons.length)];

        // 2. Llamamos a la API
        const respuesta = await consumirApiPokemonFachada(randomId);

        // 3. Actualizamos la vista (Usando tu variable 'opciones')
        this.opciones[i].imagen = respuesta.imagen;
        this.opciones[i].texto = respuesta.nombre;

        // Guardamos ID para calcular
        idsEnMesa.push(respuesta.id);
      }

      // 4. Calcular Puntos (Limpio, sin textos extraños)
      if (idsEnMesa[0] === idsEnMesa[1] && idsEnMesa[1] === idsEnMesa[2]) {
        this.puntaje += 5;
      } else if (
        idsEnMesa[0] === idsEnMesa[1] ||
        idsEnMesa[0] === idsEnMesa[2] ||
        idsEnMesa[1] === idsEnMesa[2]
      ) {
        this.puntaje += 2;
      }
    },

    reiniciar() {
      this.puntaje = 0;
      this.intentos = 0;
      this.opciones = [
        { imagen: "https://via.placeholder.com/250", texto: "XXXXXXXXXX" },
        { imagen: "https://via.placeholder.com/250", texto: "XXXXXXXXXX" },
        { imagen: "https://via.placeholder.com/250", texto: "XXXXXXXXXX" },
      ];
    },
  },
};
</script>

<style scoped>
.perdiste {
  color: red;
  border: 2px solid red;
  padding: 20px;
}
.mensaje-azul {
  color: blue;
  border: 2px solid blue;
  padding: 20px;
}
.fila-cartas {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.btn-jugar {
  padding: 10px 30px;
  font-size: 20px;
  font-weight: bold;
  border: 3px solid black;
  cursor: pointer;
}
.main-container {
  text-align: center;
  font-family: sans-serif;
}
</style>