import React from "react";
import { PokemonFNImageImport } from "../data/PokemonFrontNormalImageImports";
import { Utils } from "../modules/Utils";
import "../styles/pods/HabitatPokemonPod.css";

export const HabitatPokemonPod = (props) => {

    let pokeName = props.pokemon[props.number].name;

    return(
        <div id="habitatPokemonPod" style={{"border": "1px solid black", "borderRadius": "5px"}}>
            <img alt={pokeName} src={PokemonFNImageImport[Utils.getPokedexIndexByName(pokeName) - 1][pokeName.toLowerCase()]}/>
            <div style={{"display": "grid", "gridTemplateColumns": "50% 50%"}}>
                <button>Team</button>
                <button>Farm</button>
            </div>
        </div>
    )
}