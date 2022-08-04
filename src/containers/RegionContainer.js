import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeRegion } from "../slices/PlayerSlice";
import { RouteComponent } from "../components/RouteComponent";

export const RegionContainer = () => {

    let dispatch = useDispatch();
    let player = useSelector((state)=> state.player)
    const triggerChangeRegion = (region) => {
        let route;
        switch(region) {
            case "Kanto": route = "Route 1";
            break;
            case "Johto": route = "Route 29";
            break;
            default: window.location.reload();
        }
        dispatch(changeRegion({"region": region, "route": route}));
    }

    return(
        <div id="regionContainer">
            <select onChange={(e)=>{triggerChangeRegion(e.target.value)}}>
                <option value={"Kanto"}>Kanto</option>
                <option value={"Johto"}>Johto</option>
            </select>
            <RouteComponent player={player}/>
        </div>
    )
}