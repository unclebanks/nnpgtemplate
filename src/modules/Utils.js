import { useDispatch } from "react-redux";
import { Habitat } from "../classes/Habitat";
import { Player } from "../classes/Player";
import { Pokemon } from "../classes/Pokemon";
import { POKEDEX } from "../data/Database"

export const Utils = {


    playerFile() {
        if(!localStorage.getItem("v1")) {
            this.createSave()
            return JSON.parse(localStorage.getItem("v1"));
        } else { return this.loadPlayer(""); }
    },
    loadPlayer(sF) {
        if(sF === "") {
            sF = JSON.parse(localStorage.getItem("v1"));
        }
        let tempPlayer = new Player();
        tempPlayer.loadSave(sF);
        return tempPlayer;
    },
    createSave() {
        let player = new Player();
        let hab = new Habitat("Fire");
        let hab1 = new Habitat("Grass");
        let hab2 = new Habitat("Water");
        let hab3 = new Habitat("Electric");
        let s1 = new Pokemon(Utils.getPokemonPokedexInfoByName("Squirtle"), 5);
        let s2 = new Pokemon(Utils.getPokemonPokedexInfoByName("Charmander"), 5);
        let s3 = new Pokemon(Utils.getPokemonPokedexInfoByName("Bulbasaur"), 5);
        let s4 = new Pokemon(Utils.getPokemonPokedexInfoByName("Pikachu"), 5);
        let s5 = new Pokemon(Utils.getPokemonPokedexInfoByName("Eevee"), 5);
        let s6 = new Pokemon(Utils.getPokemonPokedexInfoByName("Clefairy"), 5);
        let s7 = new Pokemon(Utils.getPokemonPokedexInfoByName("Wartortle"), 5);
        let s8 = new Pokemon(Utils.getPokemonPokedexInfoByName("Charmeleon"), 5);
        let s9 = new Pokemon(Utils.getPokemonPokedexInfoByName("Ivysaur"), 5);
        let s10 = new Pokemon(Utils.getPokemonPokedexInfoByName("Raichu"), 5);
        let s11 = new Pokemon(Utils.getPokemonPokedexInfoByName("Jolteon"), 5);
        let s12 = new Pokemon(Utils.getPokemonPokedexInfoByName("Blastoise"), 5);
        hab.addPokemon(s8);
        hab1.addPokemon(s9);
        hab2.addPokemon(s12);
        hab2.addPokemon(s7);
        hab3.addPokemon(s10);
        hab3.addPokemon(s11);
        player.addHabitat(hab);
        player.addHabitat(hab1);
        player.addHabitat(hab2);
        player.addHabitat(hab3);
        player.addPoke(s1);
        player.addPoke(s2);
        player.addPoke(s3);
        player.addPoke(s4);
        player.addPoke(s5);
        player.addPoke(s6);
        localStorage.setItem("v1", JSON.stringify(player));
        console.log("Save Created, outputting player  ====== "+player);
    },
    getPokemonPokedexInfoByName(pokeName) {
        let i = 0;
        while(i < POKEDEX.length) {
            if(POKEDEX[i].name === pokeName) {
                return POKEDEX[i];
            } else { i++; }
        }
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
    },
    cloneObject(obj) {
        let nObj = obj;
        return nObj;
    }
}