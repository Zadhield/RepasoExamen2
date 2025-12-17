<template>
  <div class="tarjeta-formulario">
    <div class="imagen-contenedor">
      <img v-if="candidato.fotografia" :src="candidato.fotografia" alt="Foto" />
      <div v-else class="placeholder">Fotografía</div>
    </div>

    <div class="datos">
      <label>Título</label>
      <input v-model="candidato.titulo" type="text" />

      <label>Nombre</label>
      <input v-model="candidato.nombre" type="text" />

      <label>Apellido</label>
      <input v-model="candidato.apellido" type="text" />

      <label>Email (Atributo 5)</label>
      <input v-model="candidato.email" type="text" />

      <label>Género (Atributo 6)</label>
      <input v-model="candidato.genero" type="text" />
    </div>

    <div class="botones">
      <button class="btn-buscar" @click="buscarUsuario">Buscar</button>
      <button class="btn-agregar" @click="agregarUsuario">Agregar</button>
    </div>
  </div>
</template>

<script>
import { obtenerCandidatoFachada } from "@/client/ClienteUsuario";

export default {
  name: "Candidato",
  data() {
    return {
      // Objeto local para guardar los datos del formulario temporalmente
      candidato: {
        fotografia: "",
        titulo: "",
        nombre: "",
        apellido: "",
        email: "",
        genero: "",
      },
    };
  },
  methods: {
    async buscarUsuario() {
      // P1: Consumir API y llenar formulario [cite: 113]
      const data = await obtenerCandidatoFachada();
      const usuario = data.results[0]; // La API devuelve un array 'results'

      // Mapeo de datos según instrucciones [cite: 114-120]
      this.candidato.fotografia = usuario.picture.large;
      this.candidato.titulo = usuario.name.title;
      this.candidato.nombre = usuario.name.first;
      this.candidato.apellido = usuario.name.last;
      this.candidato.email = usuario.email; // Atributo 5 elegido
      this.candidato.genero = usuario.gender; // Atributo 6 elegido
    },

    agregarUsuario() {
      // P2: Enviar datos al Padre para que los agregue a la lista
      // Usamos Spread Operator {...} para enviar una COPIA del objeto, no la referencia
      this.$emit("add-candidato", { ...this.candidato });
      
      // Opcional: Limpiar formulario después de agregar
      this.candidato = {
        fotografia: "", titulo: "", nombre: "", apellido: "", email: "", genero: ""
      };
    }
  },
};
</script>

<style scoped>
/* Estilos básicos [cite: 137] */
.tarjeta-formulario {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.imagen-contenedor img {
  border-radius: 10px;
  width: 120px;
  height: 120px;
}
.datos {
  width: 100%;
  margin-top: 10px;
}
input {
  width: 90%;
  margin-bottom: 5px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.botones {
  margin-top: 15px;
  display: flex;
  gap: 10px;
}
.btn-buscar { background-color: #0056b3; color: white; padding: 5px 15px; border: none; cursor: pointer; }
.btn-agregar { background-color: #0056b3; color: white; padding: 5px 15px; border: none; cursor: pointer; }
</style>