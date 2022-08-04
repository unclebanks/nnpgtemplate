import React, { useState } from "react";
import ROUTES from "../data/Routes";
import { useSelector } from "react-redux";
import { Utils } from "../modules/Utils";
import { PokemonBNImageImport } from "../data/PokemonBackNormalImageImports";
import { PokemonFNImageImport } from "../data/PokemonFrontNormalImageImports";
import { Pokemon } from "../classes/Pokemon";

export const CombatContainer = () => {

    let regionInfo = useSelector((state)=>state.player.location.region);
    let routeInfo = useSelector((state)=>state.player.location.route);
    let lowerLevel = ROUTES[regionInfo][Utils.getRouteIndexByName(regionInfo,routeInfo)].minLevel;
    let upperLevel = ROUTES[regionInfo][Utils.getRouteIndexByName(regionInfo,routeInfo)].maxLevel
    let enemyArray = ROUTES[regionInfo][Utils.getRouteIndexByName(regionInfo,routeInfo)].pokes;
    const [activeEnemyPokemonIndex,setActiveEnemyPokemon] = useState(0);
    const [energyBar,setEnergyBar] = useState(6);
    const activeEnemyPokemon = new Pokemon(Utils.getPokemonPokedexInfoByName(enemyArray[activeEnemyPokemonIndex]),upperLevel);
    const playerActivePokemonIndex = useSelector((state)=>state.player.activePokeID);
    const playerActivePokemon = useSelector((state)=>state.player.pokemon[playerActivePokemonIndex]);
    const attackEnemy = () => {
        activeEnemyPokemon.takeDamage(playerActivePokemon.avgAttack());
        console.log(activeEnemyPokemon);
    }
    console.log(playerActivePokemon);
    console.log(activeEnemyPokemon);
    const renderEnergy = () => {
        let i = 0;
        let energyArray = [];
        while(i < energyBar) {
            energyArray.push(<div style={{"backgroundColor":"green", "borderRadius": "2px", "width":"90%","marginLeft":"5%"}}></div>);
            i++;
        }
        return energyArray;
    }

    return(
        <div style={{"display":"grid","gridTemplateRows": "80% 20%", "height": "100%"}}>
            <div id="pokemonBattleComponent" style={{"display":"grid","gridTemplateRows": "50% 50%"}}>
                <div>
                    <div>Max HP: {activeEnemyPokemon.computedStats.hp}/ Current HP: {activeEnemyPokemon.currentHp}</div>
                    <div>
                        <img alt={activeEnemyPokemon.name} src={PokemonFNImageImport[Utils.getPokedexIndexByName(activeEnemyPokemon.name) - 1][activeEnemyPokemon.name.toLowerCase()]}/>
                    </div>
                    <div>Exp Bar</div>
                </div>
                <div>
                    <div>HP Bar</div>
                    <div>
                        <img alt={playerActivePokemon.name} src={PokemonBNImageImport[Utils.getPokedexIndexByName(playerActivePokemon.name) - 1][playerActivePokemon.name.toLowerCase()]}/>
                    </div>
                    <div>Exp Bar</div>
                </div>
            </div>
            <div style={{"outline":"4px dotted black", "display":"grid","gridTemplateRows":"20% 80%"}}>
                <div style={{"display":"grid","gridTemplateColumns": `repeat(${renderEnergy().length}, 1fr)`}}>{renderEnergy()}</div>
                <div style={{"display":"grid","gridTemplateColumns": "50% 50%","gridTemplateRows":"50% 50%"}}>
                    <button onClick={()=>{attackEnemy()}}>Attack (minEnergy - maxEnergy)</button>
                    <button onClick={()=>{console.log(activeEnemyPokemon)}}>Pokemon 3 Energy</button>
                    <button>Bag (minEnergy - maxEnergy)</button>
                    <button>Run 4 Energy</button>
                </div>
            </div>
        </div>
    )
}