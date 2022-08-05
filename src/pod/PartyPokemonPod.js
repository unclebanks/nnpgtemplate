import React from "react";
import { PokemonFNImageImport } from "../data/PokemonFrontNormalImageImports";
import { Utils } from "../modules/Utils";
import { useSelector } from "react-redux/es/exports";
import { PokemonStatsPod } from "./PokemonStatsPod";
import { PartyPokemonItemPod } from "./PartyPokemonItemPod";
import "../styles/pods/PartyPokemonPod.css";

export const PartyPokemonPod = (props) => {

    let pokemonToRender = useSelector((state) => state.player.pokemon[props.pokemon]);
    let partySubPodToReturn;
    let pokeTypeColor;

    switch(props.subPodState) {
        case "stats": partySubPodToReturn = <PokemonStatsPod pokemon={pokemonToRender} />;
        break;
        case "vitamins": partySubPodToReturn = <PartyPokemonItemPod />;
        break;
        default: partySubPodToReturn = "Error";
    }
    switch(pokemonToRender.baseStats.types[0]) {
        case "Water": pokeTypeColor = "lightblue";
        break;
        case "Grass": pokeTypeColor = "lightgreen";
        break;
        case "Fire": pokeTypeColor = "lightcoral";
        break;
        case "Normal": pokeTypeColor = "ghostwhite";
        break;
        case "Electric": pokeTypeColor = "yellow";
        break;
        case "Fairy": pokeTypeColor = "pink";
        break;
        default: pokeTypeColor = "white";
    }

    return(
        <div className="partyPokemonPod" style={{"gridRow": `${props.pokemon+1}`}}>
            <div style={{"display": "grid", "gridTemplateRows": "50% 50%"}}>
                <button onClick={()=>{props.changeState("stats")}}>Stats</button>
                <button onClick={()=>{props.changeState("vitamins")}}>Vitamins</button>
            </div>
            <div className="partyPokemonPodImage" style={{"backgroundColor": pokeTypeColor, "height": "100%"}}>
                <img src={PokemonFNImageImport[Utils.getPokedexIndexByName(pokemonToRender.name) - 1][pokemonToRender.name.toLowerCase()]} alt={pokemonToRender.name}/>
                <div>{pokemonToRender.name}<br/> LV: {pokemonToRender.level}</div>
            </div>
            {partySubPodToReturn}
        </div>
    )

}