<template>
  <div class="contenedor">
    
    <div v-if="intentos >= 5 && puntaje < 10" class="mensaje-rojo">
      <h2>Has utilizado tus 5 intentos</h2>
      <h2>El juego ha terminado</h2>
      <button @click="reiniciar">Nuevo Juego</button>
    </div>

    <div v-else-if="puntaje >= 10" class="mensaje-azul">
      <h2>Felicitaciones has ganado...</h2>
      <h2>Puntaje: {{ puntaje }}</h2>
      <button @click="reiniciar">Nuevo Juego</button>
    </div>

    <div v-else>
      <h1>Puntaje: {{ puntaje }}</h1>
      <h1>Intento: {{ intentos }}</h1>
      
      <div class="mesa">
        <Pokemon
          v-for="(casilla, index) in casillas"
          :key="index"
          :imagen="casilla.imagen"
          :texto="casilla.texto"
        />
      </div>
      <button @click="jugar">Jugar</button>
    </div>

  </div>
</template>

<script>
import Pokemon from "@/components/Pokemon.vue";
import { consumirApiFacade } from "@/client/YesNoClient";

export default {
  components: {
    Pokemon,
  },

  data() {
    return {
      puntaje: 0,
      intentos: 0,
      // CORREGIDO: Usamos el nombre 'casillas' para coincidir con lo que expliqué
      casillas: [
        {
          imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",
          texto: "XXXXXXXX",
        },
        {
          imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg",
          texto: "XXXXXXXX",
        },
        {
          imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg",
          texto: "XXXXXXXX",
        },
      ],
    };
  },
  
  methods: {
    async jugar() {
      this.intentos++; 
      let contadorYes = 0;

      // BUCLE PARA ACTUALIZAR LAS 3 CASILLAS
      for (let i = 0; i < 3; i++) {
        // Llamamos a la API
        const respuesta = await consumirApiFacade();
        
        // Actualizamos EL ARRAY DEL PADRE (casillas)
        this.casillas[i].imagen = respuesta.image;
        this.casillas[i].texto = respuesta.answer;

        if (respuesta.answer === 'yes') {
          contadorYes++;
        }
      }

      // CALCULAR PUNTOS
      if (contadorYes === 3) this.puntaje += 5;
      else if (contadorYes === 2) this.puntaje += 2;
      else if (contadorYes === 1) this.puntaje += 1;
    },

    reiniciar() {
        this.puntaje = 0;
        this.intentos = 0;
        this.casillas = [
            { imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg", texto: "XXXXXXXX" },
            { imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg", texto: "XXXXXXXX" },
            { imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg", texto: "XXXXXXXX" }
        ];
    }
  }
};
</script>

<style scoped>
.mensaje-rojo { color: red; border: 1px solid red; padding: 10px; }
.mensaje-azul { color: blue; border: 1px solid blue; padding: 10px; }
.mesa { display: flex; justify-content: center; }
</style>