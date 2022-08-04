import React, { useState } from "react";
import { useSelector } from "react-redux";
import { HabitatComponent } from "../components/HabitatComponent";
import "../styles/containers/HabitatContainer.css";

export const HabitatContainer = () => {

    const [habitatIndex, setHabitatIndex] = useState(0);
    const habitatArray = useSelector((state)=>state.player.habitats);
    const currentHabitat = habitatArray[habitatIndex];
    const changeHabitat = (direction) => {
        if(direction === "next" && habitatArray[habitatIndex + 1]) {
            setHabitatIndex(habitatIndex+1);
        } else if(direction === "prev" && habitatArray[habitatIndex - 1]) {
            setHabitatIndex(habitatIndex - 1);
        } else { alert("End of Habitats.")}
    }


    return(
        <div id="habitatContainer">
            <button onClick={()=>{changeHabitat("prev")}}>Prev</button>
            <HabitatComponent habitat={currentHabitat} />
            <button onClick={()=>{changeHabitat("next")}}>Next</button>
        </div>
    )
}