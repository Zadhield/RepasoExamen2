<template>
  <div class="pagina-principal">
    
    <div class="encabezado">
      <h2>Aprobación de Candidatos</h2>
    </div>

    <Candidato @add-candidato="registrarCandidato" />

    <Lista :lista="listaCandidatos" />

  </div>
</template>

<script>
import Candidato from "@/components/Candidato.vue";
import Lista from "@/components/Lista.vue";

export default {
  components: {
    Candidato,
    Lista,
  },
  data() {
    return {
      // El Padre es el dueño de la verdad (la lista oficial)
      listaCandidatos: [],
    };
  },
  methods: {
    // Método que se ejecuta cuando el Componente 1 dice "Agregar"
    registrarCandidato(candidatoNuevo) {
      // P2: Agregamos el candidato a la lista [cite: 122-123]
      this.listaCandidatos.push(candidatoNuevo);
    },
  },
};
</script>

<style scoped>
.pagina-principal {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
}
.encabezado {
  text-align: center;
  color: #333;
}
</style>