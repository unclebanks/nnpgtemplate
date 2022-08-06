import React,{ useState } from "react";
import { POKEDEX } from "./data/Database";

export const WorkFile = () => {

    const [pokeToSearch,setPokeToSearch] = useState("");
    const [processType,setProcessType] = useState("none");
    const [startNumber,setStartNumber] = useState(1);
    const [endNumber, setEndNumber] = useState(26);
    const [pokemonIndex, setPokemonIndex] = useState(0);
    let pokeArray = [];
    let pokeDataSave = JSON.parse(localStorage.getItem("v26"))? JSON.parse(localStorage.getItem("v26")): {name:"",moves:""};

    const getPokeData = () => {
        let pokeList = POKEDEX;
        let pokeDataArray = [];
        let startNum = (startNumber - 1);
        let endNum = (endNumber - 1);
        while((startNum) < (endNum)) {
            pokeArray.push(pokeList[startNum].name.toLowerCase());
            startNum++;
        }
        pokeArray.forEach((poke)=>{
            fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`)
            .then((response) => response.json())
            .then((data) => pokeDataArray.push(data));
        })
        alert("PLEASE OPEN THE CONSOLE FOR FURTHER INSTRUCTIONS.");
        console.log("Right Click the data object (the thing with the the pokemon information).");
        console.log("Select store as global variable. It should store as 'temp1'");
        console.log('In the console, enter ***localStorage.setItem("v26",JSON.stringify(temp1))***');
        console.log(pokeDataArray);
        console.log('Once you have completed that, verify the SAME numbers then enter "createMiniList"');
        console.log("This should have provided you with the move information from the Pokemon.");
        console.log("The rest of the features (Filtering The moves down) will come later");
    }
    const getWorkableList = () => {
        console.log(pokeDataSave);
        let newArray = [];
        let i = 0;
        while(i<pokeDataSave.length) {
            newArray.push({name:pokeDataSave[i].name,moves:pokeDataSave[i].moves});
            i++;
        }
        console.log(newArray);
        localStorage.setItem("v26",null);
        localStorage.setItem("v26Processed", JSON.stringify(newArray));}

    const processStuff = (type) => {
        switch(type) {
            case "getInitial": getPokeData();
            break;
            case "createMiniList": getWorkableList();
            break;
            case "none": alert("Something broke. Sorry :/");
            break;
            default: console.log("nothing");
        }
    }


    const testButton = () => {
        let preList = JSON.parse(localStorage.getItem("v26Processed"));
        // Start here. We need to process EACH MOVE from EACH POKEMON on its own.
        let pokeMoveArray = [];
        let i = 0;
        while(i < preList[0].moves.length) {
            pokeMoveArray.push(preList[pokemonIndex].moves[i]);
            i++;
        };
        localStorage.setItem("v26MovesArray", JSON.stringify(pokeMoveArray));
        let j = 0;
        let pokeMoveSecondArray = [];
        while(j<pokeMoveArray.length) {
            pokeMoveSecondArray.push({name:pokeMoveArray[j].move.name, details: pokeMoveArray[j].version_group_details[0]});
            j++;
        }
        console.log(pokeMoveSecondArray);
        // We are doing this to make sure that the moves are getting the proper data from each region.
        // IE Moves that were only in Red would crash stuff if we set the code to only look in the new games.
        // This is time consuming but makes sure there is super dope support.
        // So ToDO Order/List
        // 1. Start with first Pokemon's first move.
        // 2. Find the latest supported region for that move. 
        // 3. Add that move to a save file for that region's moves (that will need to be created too. I forgot :/)
        // 4. Rinse and repeat.
    }
    return(
        <div>
            <div>
                <span>Please start by entering the START NUMBER and END NUMBER.</span><br/>
                <span>  NOTE* These are the Pokemon IDs</span><br/>
                <span>Once you have verified the numbers, please enter "getInitial" in the PROCESS TYPE box</span><br/>
            </div>
            <br/>
            {/* <input type="text" onChange={(e)=> {setPokeToSearch(e.target.value)}}/> */}
            <div>
                <div>
                    <span>Set Initial Search Start Numer: </span>
                    <input type="text" onChange={(e)=> {setStartNumber(e.target.value)}}/>
                    <button onClick={()=>{alert(startNumber)}}>Verify Start Number</button>
                </div>
                <div>
                    <span>Set Initial Search End Numer: </span>
                    <input type="text" onChange={(e)=> {setEndNumber(e.target.value)}}/>
                    <button onClick={()=>{alert(endNumber)}}>Verify End Number</button>
                </div>
                <div>
                    <span>Process Type: </span>
                    <input type="text" onChange={(e)=> {setProcessType(e.target.value)}}/>
                    <button onClick={()=>{processStuff(processType)}}>Enter</button>
                </div>
            </div>
            <div>
                    <span>PokemonDataIndex: </span>
                    <input type="text" onChange={(e)=> {setProcessType(e.target.value)}}/>
                <button onClick={()=>{testButton()}}>Test4NOW</button>
            </div>
        </div>
    )
}