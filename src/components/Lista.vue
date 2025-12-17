<template>
  <div class="contenedor-tabla">
    <table>
      <thead>
        <tr>
          <th>Título</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Email (Attr 5)</th>
          <th>Género (Attr 6)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in lista" :key="index">
          <td class="azul">{{ item.titulo }}</td>
          <td class="azul">{{ item.nombre }}</td>
          <td class="azul">{{ item.apellido }}</td>
          <td class="azul">{{ item.email }}</td>
          <td class="azul">{{ item.genero }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Lista",
  // REQUISITO: Recibir datos vía PROPS
  props: {
    lista: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.contenedor-tabla {
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 10px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}
th {
  color: darkblue;
}
.azul {
  color: #0056b3; /* Simular color azul de la imagen */
  font-style: italic;
}
</style>