import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../styles/containers/HabitatContainer.css";

export const HabitatContainer = () => {

    const [habitatIndex, setHabitatIndex] = useState(0);
    const habitatArray = useSelector((state)=>state.player.habitats);
    const currentHabitat = habitatArray[habitatIndex];
    let habitatBackgroundColor = "white";

    switch(currentHabitat.type) {
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
    return(
        <div id="habitatContainer">
            <button>Prev</button>
            <div style={{"backgroundColor": habitatBackgroundColor}}>
                <span>{currentHabitat.type}</span>
            </div>
            <button>Next</button>
        </div>
    )
}