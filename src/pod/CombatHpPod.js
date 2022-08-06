import React from "react";

export const CombatHpPod = (props) => {

    return(
        <div style={{"width":"100%","height":"100%", "display":"grid", "gridTemplateRows":"50% 50%"}}>
            <div>HP: {props.stats.currentHp}/{props.stats.computedStats.hp}</div>
            <div style={{"backgroundColor": "lightgray", "width":"100%","height":"100%"}}>
                <div style={{"height":"100%","width": `${((props.stats.currentHp/props.stats.computedStats.hp)*100)}%`, "backgroundColor":"green"}}></div>
            </div>
        </div>
    )
}