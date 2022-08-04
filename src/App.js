import './App.css';
import { Utils } from './modules/Utils';

function App() {

  console.log(Utils.getPokemonPokedexInfoByName("Squirtle"));
  console.log(Utils.getPokedexIndexByName("Squirtle"));
  return (
    <div className="App">
    </div>
  );
}

export default App;
