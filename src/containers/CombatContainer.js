import React, { useState } from "react";
import ROUTES from "../data/Routes";
import { useDispatch, useSelector } from "react-redux";
import { Utils } from "../modules/Utils";
import { PokemonBNImageImport } from "../data/PokemonBackNormalImageImports";
import { PokemonFNImageImport } from "../data/PokemonFrontNormalImageImports";
import { Pokemon } from "../classes/Pokemon";
import { attack, initializeBattle } from "../slices/WildCombatSlice";

export const CombatContainer = () => {


    const [turn, setTurn] = useState("player");
    let dispatch = useDispatch();

    //Load WildCombat Information
    let wildCombat = useSelector((state)=> state.wildCombat);

    //Load Player Information
    let playerInfo = useSelector((state)=>state.player);
    
    // Load Energy Status
    let energyBar = wildCombat.battleEnergy;


    // Load Location Information : 
    let locInfo = useSelector((state) => state.player.location);
    let regionInfo = locInfo.region;
    let routeInfo = locInfo.route;
    let lowerLevel = ROUTES[regionInfo][Utils.getRouteIndexByName(regionInfo,routeInfo)].minLevel;
    let upperLevel = ROUTES[regionInfo][Utils.getRouteIndexByName(regionInfo,routeInfo)].maxLevel
    let enemyRoutesArray = ROUTES[regionInfo][Utils.getRouteIndexByName(regionInfo,routeInfo)].pokes;

    // Start Creating Enemy Team
    let enemyObjArrayGenerator = (enemyRoutesArray) => {
        let enemyPokeArray = [];
        let i = 0;
        console.log(enemyPokeArray);
        while(i<enemyRoutesArray.length) {
            let newPokemonToPush = new Pokemon(Utils.getPokemonPokedexInfoByName(enemyRoutesArray[i]), upperLevel);
            enemyPokeArray.push(newPokemonToPush);
            i++;
        }
        return enemyPokeArray;
    }
    let enemyObjArray = enemyObjArrayGenerator(enemyRoutesArray);
    console.log(enemyObjArray);
    let activeEnemyIndex = wildCombat.enemyPokemonIndex;
    let activeEnemyPokemon = new Pokemon(Utils.getPokemonPokedexInfoByName(enemyRoutesArray[activeEnemyIndex]),upperLevel);

    // Start Creating Player Team
    let playerArray = playerInfo.pokemon;
    let playerActivePokemonIndex = playerInfo.activePokeID;
    let playerActivePokemon = playerArray[playerActivePokemonIndex];


    // dispatch(initializeBattle({"playerPokemonArray": playerArray, "enemyPokemonArray": enemyObjArray}))
    let attackEnemy = () => {
        dispatch(attack({"attacker": "player"}));
    }
    console.log(playerActivePokemon);
    console.log(activeEnemyPokemon);
    let renderEnergy = () => {
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
                <div style={{"display": "grid","gridTemplateColumns": "50% 50%", "backgroundColor": "lightcoral"}}>
                    <div style={{"display": "grid","gridTemplateColumns": "50% 50%"}}>
                        <div>Possible Wild Pokemon</div>
                        <div></div>
                    </div>
                    <div style={{"marginTop": "25%"}}>
                        <div>Max HP: {activeEnemyPokemon.computedStats.hp}/ Current HP: {activeEnemyPokemon.currentHp}</div>
                        <div>
                            <img alt={activeEnemyPokemon.name} src={PokemonFNImageImport[Utils.getPokedexIndexByName(activeEnemyPokemon.name) - 1][activeEnemyPokemon.name.toLowerCase()]}/>
                        </div>
                        <div>Exp Bar</div>
                    </div>
                </div>
                <div style={{"display": "grid","gridTemplateColumns": "50% 50%", "backgroundColor": "lightblue"}}>
                    <div style={{"marginTop": "25%"}}>
                        <div>HP Bar</div>
                        <div>
                            <img alt={playerActivePokemon.name} src={PokemonBNImageImport[Utils.getPokedexIndexByName(playerActivePokemon.name) - 1][playerActivePokemon.name.toLowerCase()]}/>
                        </div>
                        <div>Exp Bar</div>
                    </div>
                    <div style={{"display": "grid","gridTemplateColumns": "50% 50%"}}>
                        <div></div>
                        <div>Party Pokemon</div>
                    </div>
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