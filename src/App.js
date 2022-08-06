import './App.css';
import { Pokemon } from './classes/Pokemon';
import { Utils } from './modules/Utils';
import { useSelector } from 'react-redux';
import { LeftContainer } from './containers/mainContainers/LeftContainer';
import { CenterContainer } from './containers/mainContainers/CenterContainer';
import { RightContainer } from './containers/mainContainers/RightContainer';
import { BottomContainer } from './containers/mainContainers/BottomContainer';

function App() {

  let saveFile = localStorage.getItem("v1")? JSON.parse(localStorage.getItem("v1")): "";

  if(saveFile === "") {
    Utils.createSave();
  }

  return (
    <div className="App">
      {/* <LeftContainer />
      <CenterContainer />
      <RightContainer />
      <BottomContainer /> */}
    </div>
  );
}

export default App;
