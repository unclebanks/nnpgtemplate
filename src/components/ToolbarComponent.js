import React from "react";
import { MainToolbarPod } from "../pod/MainToolbarPod";

export const ToolbarComponent = (props) => {

    let toolbarToReturn;

    switch(props.appState) {
        case "main": toolbarToReturn = <MainToolbarPod />;
        break;
        default: toolbarToReturn = "error";
    }
    

    return(
        <div id="toolbarComponent">
            {toolbarToReturn}
        </div>
    )
}