import axios from "axios";

const consumirApiPokemon = async (id) => {
    // Consumimos la data básica
    const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then(r => r.data);
    return data;
}

export const consumirApiPokemonFachada=async (id)=>{
    const data = await consumirApiPokemon(id);
    return{
        id:data.id,
        nombre:data.name,
        imagen:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg `
    };
}