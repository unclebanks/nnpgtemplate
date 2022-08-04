import React from "react";
import { useDispatch } from "react-redux";
import { changeAppState } from "../slices/PlayerSlice";

export const ToolbarComponent = (props) => {

    let dispatch = useDispatch();

    let toolbarToReturn;

    let mainToolbar = <div>
        <button onClick={()=>{dispatch(changeAppState({"appState": "combat"}))}}>Combat</button>
    </div>
    let combatToolbar = <div>
        <button onClick={()=>{dispatch(changeAppState({"appState": "main"}))}}>Main</button>
    </div>

    switch(props.appState) {
        case "main": toolbarToReturn = mainToolbar;
        break;
        case "combat": toolbarToReturn = combatToolbar;
        break;
        default: toolbarToReturn = "error";
    }
    

    return(
        <div id="toolbarComponent">
            {toolbarToReturn}
        </div>
    )
}