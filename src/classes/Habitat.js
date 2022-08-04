import React from "react";

export class Habitat {
    constructor(type) {
        this.type = type;
    }
    pokemon = [];
    maxSize = 6;
    currentSize = 2;

    addPokemon(newPokemon) {
        if((this.pokemon.length + 1) <= this.maxSize) {
            this.pokemon.push(newPokemon);
        } else { alert("This habitat cannot fit anymore Pokemon!"); }
    };
    increaseSize() {
        if(this.currentSize <= this.maxSize) {
            this.currentSize += 1;
        } else { alert("Cannot upgrade current size."); }
    };
    increaseMaxSize() {
        if(this.maxSize >= 30) {
            alert("This habitat cannot be upgraded further.");
        } else { this.maxSize += 1; }
    }
}