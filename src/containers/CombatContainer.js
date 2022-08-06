import React, { useState } from "react";
import ROUTES from "../data/Routes";
import { useDispatch, useSelector } from "react-redux";
import { Utils } from "../modules/Utils";
import { PokemonBNImageImport } from "../data/PokemonBackNormalImageImports";
import { PokemonFNImageImport } from "../data/PokemonFrontNormalImageImports";
import { Pokemon } from "../classes/Pokemon";
import { TypeModifiers } from "../data/TypeModifiers";
import { CombatHpPod } from "../pod/CombatHpPod";

export const CombatContainer = () => {


    //Load Player Information
    let playerInfo = useSelector((state)=>state.player);


    // Generate dispatch
    let dispatch = useDispatch();

    //Load Route Information
    let locInfo = playerInfo.location;
    let regionInfo = locInfo.region;
    let routeInfo = locInfo.route;
    let routeData = ROUTES[regionInfo][Utils.getRouteIndexByName(regionInfo,routeInfo)];
    let lowerLevel = routeData.minLevel;
    let upperLevel = routeData.maxLevel
    let enemyRoutesArray = routeData.pokes;
    let createEnemy = () => {
        let enemyPokeArray = [];
        let i = 0;
        while(i<enemyRoutesArray.length) {
            let newPokemonToPush = new Pokemon(Utils.getPokemonPokedexInfoByName(enemyRoutesArray[i]), upperLevel);
            enemyPokeArray.push(newPokemonToPush);
            i++;
        }
        return enemyPokeArray;
    };
    let enemyObjectArray = createEnemy();

    // Set state of this CombatContainer
    const [combatState, setCombatState] = useState({
        turn: "player",
        playerEnergy: 6,
        playerActiveIndex: 0,
        playerPokemonTeam: playerInfo.pokemon,
        playerActivePokemon: playerInfo.pokemon[0],
        enemyActiveIndex: 0,
        enemyPokemonTeam: enemyObjectArray,
        enemyActivePokemon: enemyObjectArray[0]
    });
    
    // Load Energy Status
    let energyBar = combatState.playerEnergy;


    let renderEnergy = () => {
        let i = 0;
        let energyArray = [];
        while(i < energyBar) {
            energyArray.push(<div style={{"backgroundColor":"green", "borderRadius": "2px", "width":"90%","marginLeft":"5%"}}></div>);
            i++;
        }
        return energyArray;
    }
    const enemyFaint = (player, enemy) => {
        let pokeTeamCopy = combatState.playerPokemonTeam;
        //attemptCatch();
        const foundPokeCoins = Math.floor(enemy.currentLevel() * 4);
        // useDispatch(addCoins({"type": "pokecoins", "amount": foundPokeCoins}));
        // Save this for the final dispatch with spread ^^^

        const beforeExp = playerInfo.pokemon.map((poke) => poke.currentLevel());
        const expToGive = (enemy.baseExp / 16) + (enemy.currentLevel() * 3);
        player.giveExp(expToGive);
        pokeTeamCopy.forEach((poke) => poke.giveExp((enemy.baseExp / 100) + (enemy.currentLevel() / 10)));
        pokeTeamCopy.map((poke) => poke.currentLevel());
        console.log(foundPokeCoins);
        enemy.resetHp();
        let enemyNextActive = ((combatState.enemyActiveIndex+1) >= combatState.enemyPokemonTeam.length)? combatState.enemyPokemonTeam[0]:combatState.enemyPokemonTeam[combatState.enemyActiveIndex+1];
        let indexCopy = ((combatState.enemyActiveIndex+1) >= combatState.enemyPokemonTeam.length)? 0: combatState.enemyActiveIndex + 1;
        setCombatState({...combatState,playerActivePokemon: player, playerPokemonTeam: pokeTeamCopy, enemyActiveIndex: indexCopy, enemyActivePokemon: enemyNextActive});
        console.log(combatState);
    };
    const dealDamage = (who) => {
        let tempPlayerActivePokemon = combatState.playerActivePokemon;
        let tempEnemyActivePokemon = combatState.enemyActivePokemon;
        if (tempPlayerActivePokemon.alive() && tempEnemyActivePokemon.alive()) {
            //calculate damage done
            if(who === "player") {
                const missRNG = Utils.RNG(5);
                if (!missRNG) {
                    const critRNG = Utils.RNG(5);
                    const critMultiplier = (critRNG) ? 1 + (tempPlayerActivePokemon.currentLevel() / 100) : 1;
                    const damageMultiplier = calculateDamageMultiplier(tempPlayerActivePokemon.baseStats.types, tempEnemyActivePokemon.baseStats.types) * critMultiplier;
                    tempEnemyActivePokemon.takeDamage(tempPlayerActivePokemon.avgAttack() * damageMultiplier);
                    energyBar -= 2;
                }
            } else if(who === "enemy") {
                const critRNG = Utils.RNG(5);
                const critMultiplier = (critRNG) ? 1 + (tempEnemyActivePokemon.currentLevel() / 100) : 1;
                const damageMultiplier = calculateDamageMultiplier(tempEnemyActivePokemon.baseStats.types, tempPlayerActivePokemon.baseStats.types) * critMultiplier;
                tempPlayerActivePokemon.takeDamage(tempEnemyActivePokemon.avgAttack() * damageMultiplier);
                energyBar += 1;
            }
        }
        if(energyBar > 6) {
            energyBar = 6;
        } else if(energyBar < 0) {
            energyBar = 0;
        }
        // Check if someone died.
        if (!tempPlayerActivePokemon.alive() || !tempEnemyActivePokemon.alive()) {
            if ((who === 'player') && !tempEnemyActivePokemon.alive()) {
                console.log("enemy died");
                enemyFaint(tempPlayerActivePokemon, tempEnemyActivePokemon);
            } else if((who === "enemy") && !tempPlayerActivePokemon.alive()) {
                console.log("player died");
            }
        } else { 
            setCombatState({...combatState, enemyActivePokemon: tempEnemyActivePokemon, playerEnergy: energyBar, playerActivePokemon: tempPlayerActivePokemon});
        }
    };
    const calculateDamageMultiplier = (attackingTypes, defendingTypes) => {
        const typeEffectiveness = (attackingType, defendingTypes) => TypeModifiers[attackingType][defendingTypes[0]] * ((defendingTypes[1] && TypeModifiers[attackingType][defendingTypes[1]]) || 1);
        return Math.max(
            typeEffectiveness(attackingTypes[0], defendingTypes),
            (attackingTypes[1] && typeEffectiveness(attackingTypes[1], defendingTypes)) || 0,
        );
    };
    const playerAttack = () => {
        dealDamage("player");
        dealDamage("enemy");
    }

    console.log(combatState);
    return(
        <div style={{"display":"grid","gridTemplateRows": "80% 20%", "height": "100%"}}>
            <div id="pokemonBattleComponent" style={{"display":"grid","gridTemplateRows": "50% 50%"}}>
                <div style={{"display": "grid","gridTemplateColumns": "50% 50%", "backgroundColor": "lightcoral"}}>
                    <div style={{"display": "grid","gridTemplateColumns": "50% 50%"}}>
                        <div>Possible Wild Pokemon</div>
                        <div></div>
                    </div>
                    <div style={{"display":"grid","gridTemplateRows": "25% 25% 50%"}}>
                        {/* <div>Max HP: {combatState.enemyActivePokemon.computedStats.hp}/ Current HP: {combatState.enemyActivePokemon.currentHp}</div> */}
                        <div></div>
                        <CombatHpPod stats={combatState.enemyActivePokemon}/>
                        {/* <div style={{"width":"100%","height":"100%", "display":"grid", "gridTemplateRows":"50% 50%"}}>
                            <div>HP: {combatState.enemyActivePokemon.currentHp}/{combatState.enemyActivePokemon.computedStats.hp}</div>
                            <div style={{"backgroundColor": "lightgray", "width":"100%","height":"100%"}}>
                                <div style={{"height":"100%","width": `${((combatState.enemyActivePokemon.currentHp/combatState.enemyActivePokemon.computedStats.hp)*100)}%`, "backgroundColor":"green"}}></div>
                            </div>
                        </div> */}
                        <div>
                            <img alt={combatState.enemyActivePokemon.name} src={PokemonFNImageImport[Utils.getPokedexIndexByName(combatState.enemyActivePokemon.name) - 1][combatState.enemyActivePokemon.name.toLowerCase()]}/>
                        </div>
                    </div>
                </div>
                <div style={{"display": "grid","gridTemplateColumns": "50% 50%", "backgroundColor": "lightblue"}}>
                    <div style={{"display":"grid","gridTemplateRows": "25% 25% 50%"}}>
                        <div></div>
                        <CombatHpPod stats={combatState.playerActivePokemon} />
                        <div>
                            <img alt={combatState.playerActivePokemon.name} src={PokemonBNImageImport[Utils.getPokedexIndexByName(combatState.playerActivePokemon.name) - 1][combatState.playerActivePokemon.name.toLowerCase()]}/>
                            <div>Exp Bar</div>
                        </div>
                    </div>
                    <div style={{"display": "grid","gridTemplateColumns": "50% 50%"}}>
                        <div></div>
                        <div>Party Pokemon</div>
                    </div>
                </div>
            </div>
            <div style={{"outline":"4px dotted black", "display":"grid","gridTemplateRows":"20% 80%"}}>
                <div style={{"display":"grid","gridTemplateColumns": `repeat(6, 1fr)`}}>{renderEnergy()}</div>
                <div style={{"display":"grid","gridTemplateColumns": "50% 50%","gridTemplateRows":"50% 50%"}}>
                    <button onClick={()=>{playerAttack()}}>Attack 2 Energy</button>
                    <button onClick={()=>{console.log(combatState.enemyActivePokemon)}}>Pokemon 3 Energy</button>
                    <button>Bag (minEnergy - maxEnergy)</button>
                    <button>Run 4 Energy</button>
                </div>
            </div>
        </div>
    )
}