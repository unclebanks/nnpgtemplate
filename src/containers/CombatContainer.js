import React, { useState } from "react";
import ROUTES from "../data/Routes";
import { useDispatch, useSelector } from "react-redux";
import { Utils } from "../modules/Utils";
import { PokemonBNImageImport } from "../data/PokemonBackNormalImageImports";
import { PokemonFNImageImport } from "../data/PokemonFrontNormalImageImports";
import { Pokemon } from "../classes/Pokemon";
import { TypeModifiers } from "../data/TypeModifiers";

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
    // let testAttack = () => {
    //     setCombatState({...combatState, enemyActivePokemon: {...combatState.enemyActivePokemon, currentHp: 5} })
    // };     
    const enemyFaint = () => {
        let pokeTeamCopy = combatState.playerPokemonTeam;
        //attemptCatch();
        const foundPokeCoins = Math.floor(combatState.enemyActivePokemon.currentLevel() * 4);
        // useDispatch(addCoins({"type": "pokecoins", "amount": foundPokeCoins}));
        // Save this for the final dispatch with spread ^^^

        const beforeExp = playerInfo.pokemon.map((poke) => poke.currentLevel());
        const expToGive = (combatState.enemyActivePokemon.baseExp / 16) + (combatState.enemyActivePokemon.currentLevel() * 3);
        pokeTeamCopy[combatState.playerActiveIndex].giveExp(expToGive);
        pokeTeamCopy.forEach((poke) => poke.giveExp((combatState.enemyActivePokemon.baseExp / 100) + (combatState.enemyActivePokemon.currentLevel() / 10)));
        pokeTeamCopy.map((poke) => poke.currentLevel());
        console.log(foundPokeCoins);
        let enemyNextActive = ((combatState.enemyActiveIndex+1) >= combatState.enemyPokemonTeam.length)? combatState.enemyPokemonTeam[0]:combatState.enemyPokemonTeam[combatState.enemyActiveIndex+1];
        let indexCopy = ((combatState.enemyActiveIndex+1) >= combatState.enemyPokemonTeam.length)? 0: combatState.enemyActiveIndex + 1;
        setCombatState({...combatState, playerPokemonTeam: pokeTeamCopy, enemyActiveIndex: indexCopy, enemyActivePokemon: enemyNextActive});
        console.log(combatState);

        // player.savePokes();
        // Combat.newEnemy();
        // Combat.enemyTimer();
        // Combat.playerTimer();
    };
    const dealDamage = (who) => {
            if (combatState.playerActivePokemon.alive() && combatState.enemyActivePokemon.alive()) {
                //calculate damage done
                const missRNG = Utils.RNG(5);
                if (!missRNG) {
                    const critRNG = Utils.RNG(5);
                    const critMultiplier = (critRNG) ? 1 + (combatState.playerActivePokemon.currentLevel() / 100) : 1;
                    const damageMultiplier = calculateDamageMultiplier(combatState.playerActivePokemon.baseStats.types, combatState.enemyActivePokemon.baseStats.types) * critMultiplier;
                    combatState.enemyActivePokemon.takeDamage(combatState.playerActivePokemon.avgAttack() * damageMultiplier);
                }
            }
            if (!combatState.playerActivePokemon.alive() || !combatState.enemyActivePokemon.alive()) {
            //one is dead

                if (((who === 'enemy') && !combatState.playerActivePokemon.alive()) || ((who === 'player') && !combatState.enemyActivePokemon.alive())) {
                    console.log("enemy died");
                    enemyFaint();
                } else {
                    console.log("player died");
                }
            } else { 
                let enemyCopy = combatState.enemyActivePokemon;
                setCombatState({...combatState, enemyActivePokemon: enemyCopy })
            }
    };
    const calculateDamageMultiplier = (attackingTypes, defendingTypes) => {
        const typeEffectiveness = (attackingType, defendingTypes) => TypeModifiers[attackingType][defendingTypes[0]] * ((defendingTypes[1] && TypeModifiers[attackingType][defendingTypes[1]]) || 1);
        return Math.max(
            typeEffectiveness(attackingTypes[0], defendingTypes),
            (attackingTypes[1] && typeEffectiveness(attackingTypes[1], defendingTypes)) || 0,
        );
    };

    console.log(combatState);
    return(
        <div style={{"display":"grid","gridTemplateRows": "80% 20%", "height": "100%"}}>
            <div id="pokemonBattleComponent" style={{"display":"grid","gridTemplateRows": "50% 50%"}}>
                <div style={{"display": "grid","gridTemplateColumns": "50% 50%", "backgroundColor": "lightcoral"}}>
                    <div style={{"display": "grid","gridTemplateColumns": "50% 50%"}}>
                        <div>Possible Wild Pokemon</div>
                        <div></div>
                    </div>
                    <div style={{"marginTop": "25%"}}>
                        <div>Max HP: {combatState.enemyActivePokemon.computedStats.hp}/ Current HP: {combatState.enemyActivePokemon.currentHp}</div>
                        <div>
                            <img alt={combatState.enemyActivePokemon.name} src={PokemonFNImageImport[Utils.getPokedexIndexByName(combatState.enemyActivePokemon.name) - 1][combatState.enemyActivePokemon.name.toLowerCase()]}/>
                        </div>
                        <div>Exp Bar</div>
                    </div>
                </div>
                <div style={{"display": "grid","gridTemplateColumns": "50% 50%", "backgroundColor": "lightblue"}}>
                    <div style={{"marginTop": "25%"}}>
                        <div>HP Bar</div>
                        <div>
                            <img alt={combatState.playerActivePokemon.name} src={PokemonBNImageImport[Utils.getPokedexIndexByName(combatState.playerActivePokemon.name) - 1][combatState.playerActivePokemon.name.toLowerCase()]}/>
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
                    <button onClick={()=>{dealDamage("player")}}>Attack (minEnergy - maxEnergy)</button>
                    <button onClick={()=>{console.log(combatState.enemyActivePokemon)}}>Pokemon 3 Energy</button>
                    <button>Bag (minEnergy - maxEnergy)</button>
                    <button>Run 4 Energy</button>
                </div>
            </div>
        </div>
    )
}