import React, { useState } from "react";
import { useSelector } from "react-redux";
import { PartyPokemonPod } from "../pod/PartyPokemonPod";

export const PartyComponent = () => {

    const partyPokemon = useSelector((state)=> state.player.pokemon);
    const playerVitamins = useSelector((state) => state.player.vitamins);
    const [currentPartyPokemonSubPod, setCurrentPartyPokemonSubPod ] = useState("stats");

    let partyPokemonPodArray = [];
    let i = 0;
    const changeCurrentPartyPokemonSubPod = (newState) => {
        setCurrentPartyPokemonSubPod(newState);
    }
    while(i < partyPokemon.length) {
        partyPokemonPodArray.push(<PartyPokemonPod pokemon={i} subPodState={currentPartyPokemonSubPod} changeState={changeCurrentPartyPokemonSubPod}/>);
        i++;
    }
    return(
        <div id="partyComponent" style={{"display": "grid","gridTemplateRows": `repeat(${partyPokemonPodArray.length}, 1fr)`, "height": "100%"}}>
            {partyPokemonPodArray}
        </div>
    )
}