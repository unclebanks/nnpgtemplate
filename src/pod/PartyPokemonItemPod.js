import React from "react";
import { useSelector } from "react-redux";
import "../styles/pods/PartyPokemonItemPod.css";

export const PartyPokemonItemPod = () => {

    const vitamins = useSelector((state) => state.player.vitamins);

    return(
        <div id="PartyPokemonItemPod">
            <button>HP UP: {vitamins["Hp Up"]}</button>
            <button>Protein: {vitamins["Protein"]}</button>
            <button>Iron: {vitamins["Iron"]}</button>
            <button>Calcium: {vitamins["Calcium"]}</button>
            <button>Zinc: {vitamins["Zinc"]}</button>
            <button>Carbos: {vitamins["Carbos"]}</button>
        </div>
    )
}