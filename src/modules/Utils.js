import { POKEDEX } from "../data/Database"

export const Utils = {

    getPokemonPokedexInfoByName(pokeName) {
        return POKEDEX.filter((poke) => poke.name === pokeName);
    },
    getPokedexIndexByName(pokeName) {
        let i = 0;
        while(i < POKEDEX.length) {
            if(POKEDEX[i].name === pokeName) {
                return i+1;
            } else {
                i++;
            }
        }
    }
}