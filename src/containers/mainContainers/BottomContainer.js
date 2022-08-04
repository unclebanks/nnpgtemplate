import React from "react"
import { ToolbarComponent } from "../../components/ToolbarComponent";
import { useSelector } from "react-redux";
import "../../styles/containers/mainContainers/BottomContainer.css";

export const BottomContainer = () => {

    let appState = useSelector((state)=> state.player.appState);

    return(
        <div id="bottomContainer">
            <ToolbarComponent appState={appState}/>
        </div>
    )
}