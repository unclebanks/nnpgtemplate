import React from "react";

export class Habitat {
    constructor(type) {
        this.type = type;
    }
    pokemon = [];

    addPokemon(newPokemon) {
        this.pokemon.push(newPokemon);
    };
}