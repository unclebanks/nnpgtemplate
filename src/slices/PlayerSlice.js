import React from "react";
import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice(
    {
        name:"player",
        initialState: {
            pokemon: []
        },
        reducers: {
            addPokemon: (state, action) => {
                state.pokemon.push(action.payload.pokemon);
            }
        }
    }
)

export const { addPokemon } = playerSlice.actions;

export default playerSlice.reducer;