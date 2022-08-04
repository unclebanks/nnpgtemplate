import React from "react";
import { createSlice } from "@reduxjs/toolkit";


export const wildCombatSlice = createSlice(
    {
        name:"wildCombat",
        initialState: {
            playerPokemonArray: [],
            playerPokemonIndex: 0,
            activePlayerPokemon: {},
            enemyPokemonArray: [],
            enemyPokemonIndex: 0,
            enemyActivePokemon: {},
            battleEnergy: 6
        },
        reducers: {
            useEnergy: (state, action) => {
                state.battleEnergy -= action.payload.amount;
            },
            attack: (state,action) => {
                if(action.payload.attacker === "player") {
                    state.enemyActivePokemon.hp -= (state.activePlayerPokemon.avgDefense() - state.enemyActivePokemon.avgAttack());
                } else { state.activePlayerPokemon.hp -= (state.enemyActivePokemon.avgDefense() - state.activePlayerPokemon.avgAttack())}
            },
            initializeBattle: (state, action) => {
                state.playerPokemonArray = action.payload.playerPokemonArray;
                state.activePlayerPokemon = state.playerPokemonArray[state.playerPokemonIndex];
                state.enemyPokemonArray = action.payload.enemyPokemonArray;
                state.enemyActivePokemon = state.enemyPokemonArray[state.enemyPokemonIndex];
                console.log(state);
            }
        }
    }
)

export const { useEnergy, attack, initializeBattle } = wildCombatSlice.actions;

export default wildCombatSlice.reducer;