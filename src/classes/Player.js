import React from "react";
import { Utils } from "../modules/Utils";
import { Pokemon } from "./Pokemon";

export class Player {

    pokedexHighestID = 0;
    activePokeID = 0;
    lastHeal = Date.now();
    pokemon = [];
    pcPokemon = [];
    berryFields = [];
    currentBoostedRoamer = {
        region: 'Kanto',
        route: 'Route 1',
        pokemon: 'Raikou',
        start: 0,
        length: 5 * 60 * 1000,
        expired: false,
    };
    selectedBall = 'pokeball';
    ballsAmount = {
        pokeball: 20,
        greatball: 0,
        ultraball: 0,
        masterball: 0,
    };
    unlocked = {};
    secretCodes = {};
    evoStones = {};
    currencyAmount = {
        pokecoins: 1000,
        catchcoins: 0,
        battlecoins: 0,
        gametokens: 100,
    };
    settings = {
        currentRegionId: 'Kanto',
        currentRouteId: 'Route 1',
        listView: 'pokeDex',
        theme: 'dark',
        autoSort: true,
        dexView: 'all',
        dexVersion: 1, // check if users dex is out of date
        spriteChoice: 'back',
        catching: false,
    };
    badges = {};
    wins = {};
    events = {};
    addPoke(poke) {
        if(this.pokemon.length > 5) {
            this.pcPokemon.push(poke);
        } else { this.pokemon.push(poke); }
    };
    addBerryField(bF) {
        this.berryFields.push(bF);
    };
    createPokemon(sF) {
        let pokemonArray = [];
        let i =0;
        while(i < sF.length) {
            let newPokemonForArray = new Pokemon(Utils.cloneObject(sF[i]), sF[i].level);
            pokemonArray.push(newPokemonForArray);
            i++;
        }
        return pokemonArray;
    };
    loadSave(sF) {
        this.pokedexHighestID = sF.pokedexHighestID;
        this.activePokeID = sF.activePokeID;
        this.lastHeal = sF.lastHeal;
        this.pokemon = this.createPokemon(sF.pokemon);
        this.pcPokemon = sF.pcPokemon;
        this.currentBoostedRoamer = sF.currentBoostedRoamer;
        this.selectedBall = sF.selectedBall;
        this.ballsAmount = sF.ballsAmount;
        this.unlocked = sF.unlocked;
        this.secretCodes = sF.secretCodes;
        this.evoStones = sF.evoStones;
        this.currencyAmount = sF.currencyAmount;
        this.settings = sF.settings;
        this.badges = sF.badges;
        this.wins = sF.wins;
        this.events = sF.events;
        this.berryFields = sF.berryFields;
    };
    changeRoute(newRoute) {
        this.settings.currentRouteId = newRoute;
    };
    changeRegion(newRegion, newRoute) {
        this.settings.currentRegionId = newRegion;
        this.settings.currentRouteId = newRoute;
    };
    alivePokeIndexes() {
        const alive = this.pokemon.filter((poke) => poke.alive());
        return alive;
    };
}