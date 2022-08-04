import React from "react"
import { useSelector } from "react-redux";
import "../../styles/containers/mainContainers/RightContainer.css";
import { FarmContainer } from "../FarmContainer";

export const RightContainer = () => {

    let appState = useSelector((state)=> state.player.appState);
    let rightContainerToReturn;
    switch(appState) {
        case "main": rightContainerToReturn = <FarmContainer />;
        break;
        default: rightContainerToReturn = "Error";
    }

    return(
        <div id="rightContainer">
            {rightContainerToReturn}
        </div>
    )
}