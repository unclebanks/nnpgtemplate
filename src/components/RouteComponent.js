import React from "react";
import ROUTES from "../data/Routes";
import { useDispatch, useSelector } from "react-redux";
import "../styles/components/RouteComponent.css";
import { changeRoute } from "../slices/PlayerSlice";

export const RouteComponent = () => {

    let dispatch = useDispatch();
    const regionID = useSelector((state)=> state.player.location.region);
    const routesToMake = ROUTES[regionID].slice(1);
    let loadRoutes = () => {
        let routeButtons = [];
        routesToMake.forEach(route => {
            routeButtons.push(<button style={{"fontStyle": "italic"}} onClick={()=>{dispatch(changeRoute({"route": route.name}))}} key={route.name}>{route.name}</button>);
        })
        return <ul style={{"display": "grid", "gridTemplateRows": `repeat(${routesToMake.length}, 1fr)`}}>{routeButtons}</ul>;
    }
    return(
        <div id="routeComponent">
            {loadRoutes()}
        </div>
    )
}