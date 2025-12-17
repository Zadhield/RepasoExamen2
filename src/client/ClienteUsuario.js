import axios from "axios";

const consumirApi = async () => {
  // Consumimos la API requerida
  const data = axios.get("https://randomuser.me/api/").then((r) => r.data);
  return data;
};

export const obtenerCandidatoFachada = async () => {
  return await consumirApi();
};