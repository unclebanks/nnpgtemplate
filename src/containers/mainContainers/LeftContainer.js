import React from "react";
import { useSelector } from "react-redux";
import { CombatBagComponent } from "../../components/CombatBagComponent";
import { PartyComponent } from "../../components/PartyComponent";
import "../../styles/containers/mainContainers/LeftContainer.css";

export const LeftContainer = () => {

    let appState = useSelector((state)=> state.player.appState);
    let leftContainerToReturn;

    switch(appState) {
        case "main": leftContainerToReturn = <PartyComponent />;
        break;
        case "combat": leftContainerToReturn = <CombatBagComponent />;
        break;
        default: leftContainerToReturn = "Error";
    };

    return(
        <div id="leftContainer">
            {leftContainerToReturn}
        </div>
    )
}