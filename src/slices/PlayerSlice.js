import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { Utils } from "../modules/Utils";

let player = Utils.playerFile();

export const playerSlice = createSlice(
    {
        name:"player",
        initialState: {
            pokedexHighestID: player.pokedexHighestID,
            activePokeID: player.activePokeID,
            lastHeal: player.lastHeal,
            pokemon: player.pokemon,
            pcPokemon: player.pcPokemon,
            berryFields: player.berryFields,
            habitats: player.habitats,
            currentBoostedRoamer: {
                region: player.currentBoostedRoamer.region,
                route: player.currentBoostedRoamer.route,
                pokemon: player.currentBoostedRoamer.pokemon,
                start: player.currentBoostedRoamer.start,
                length: player.currentBoostedRoamer.length,
                expired: player.currentBoostedRoamer.expired,
            },
            selectedBall: player.selectedBall,
            ballsAmount: {
                pokeball: player.ballsAmount.pokeball,
                greatball: player.ballsAmount.greatball,
                ultraball: player.ballsAmount.ultraball,
                masterball: player.ballsAmount.masterball,
            },
            unlocked: player.unlocked,
            secretCodes: player.secretCodes,
            evoStones: player.evoStones,
            badges: player.badges,
            wins: player.wins,
            events: player.events,
            currency: {
                pokecoins: player.currencyAmount.pokecoins,
                catchcoins: player.currencyAmount.catchcoins,
                battlecoins: player.currencyAmount.battlecoins,
                gametokens: player.currencyAmount.gametokens,
            },
            location: {
                region: player.settings.currentRegionId,
                route: player.settings.currentRouteId
            },
            appState: "main",
            vitamins: {
                "Hp Up": 5,
                "Protein": 5,
                "Iron": 5,
                "Calcium": 5,
                "Zinc": 5,
                "Carbos": 5
            },
            battle: false
        },
        reducers: {
            addCoins: (state, action) => {
                state.currency[action.payload.type] += action.payload.value;
            },
            changeRoute: (state, action) => {
                state.location.route = action.payload.route;
            },
            changeRegion: (state, action) => {
                state.location.region = action.payload.region;
                switch(action.payload.region) {
                    case "Kanto": state.location.route = "Route 1";
                    break;
                    case "Johto": state.location.route = "Route 29";
                    break;
                    default: window.location.reload();
                }
            },
            changeAppState: (state, action) => {
                if(state.appState !== action.payload.appState) {
                    state.appState = action.payload.appState;
                }
            },
            setActive(state, action) {
                state.activePokeID = action.payload.newID;
            },
            addPokemon(state, action) {
                if(state.pokemon.length >= 2) {
                    state.pcPokemon.pus(action.payload.pokemon);
                } else {
                    state.pokemon.push(action.payload.pokemon);
                }
            },
            startBattle(state) {
                state.battle = true;
            },
            stopBattle(state) {
                state.battle = false;
            }
        }
    }
)

export const { addPokemon, addMultiplePokemon, changeAppState, changeRegion, changeRoute } = playerSlice.actions;

export default playerSlice.reducer;