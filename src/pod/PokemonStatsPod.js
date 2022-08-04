import React from "react";
import "../styles/pods/PokemonStatsPod.css";

export const PokemonStatsPod = (props) => {

    return(
        <div id="pokemonStatsComponent">
            <button>HP: {props.pokemon.computedStats["hp"]}</button>
            <button>ATK: {props.pokemon.computedStats["atk"]}</button>
            <button>DEF: {props.pokemon.computedStats["def"]}</button>
            <button>SP ATK: {props.pokemon.computedStats["spAtk"]}</button>
            <button>SP DEF: {props.pokemon.computedStats["spDef"]}</button>
            <button>SPD: {props.pokemon.computedStats["speed"]}</button>
        </div>
    )
}