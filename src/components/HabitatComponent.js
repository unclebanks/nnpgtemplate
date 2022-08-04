import React from "react";
import { HabitatPokemonPod } from "../pod/HabitatPokemonPod";

export const HabitatComponent = (props) => {
    
    let habitatBackgroundColor = "white";

    switch(props.habitat.type) {
        case "Fire": habitatBackgroundColor = "lightcoral";
        break;
        case "Water": habitatBackgroundColor = "lightblue";
        break;
        case "Grass": habitatBackgroundColor = "lightgreen";
        break;
        case "Electric": habitatBackgroundColor = "yellow";
        break;
        default: habitatBackgroundColor = "white";
    }
    let habitatPokeArray = [];
    let i = 0;
    while(i < props.habitat.pokemon.length) {
        habitatPokeArray.push(<HabitatPokemonPod pokemon={props.habitat.pokemon} number={i} />);
        habitatPokeArray.push(<div></div>);
        i++;
    }

    return(
        <div style={{"backgroundColor": habitatBackgroundColor, "display": "grid", "gridTemplateRows": "5% 95%"}}>
            <div>{props.habitat.type} Habitat</div>
            <div style={{"display": "grid", "gridTemplateColumns": "20% 20% 20% 20% 20%", "gridTemplateRows": "20% 20% 20% 20% 20%"}}>
                {habitatPokeArray}
            </div>
        </div>
    )
}