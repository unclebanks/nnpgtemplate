import React from "react"
import { useSelector } from "react-redux";
import "../../styles/containers/mainContainers/CenterContainer.css";
import { CombatContainer } from "../CombatContainer";
import { HabitatContainer } from "../HabitatContainer";

export const CenterContainer = () => {

    let appState = useSelector((state)=> state.player.appState);
    let centerContainerToReturn;

    switch(appState) {
        case "main": centerContainerToReturn = <HabitatContainer />;
        break;
        case "combat": centerContainerToReturn = <CombatContainer />;
        break;
        default: centerContainerToReturn = "Error";
    }
    return(
        <div id="centerContainer">
            {centerContainerToReturn}
        </div>
    )
}