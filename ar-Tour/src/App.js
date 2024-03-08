import "./App.css";

import { useOrientation } from "@uidotdev/usehooks";
import { Route, Routes } from "react-router-dom";

import Ori from "./assets/images/ori.png";
// import Preload from './components/preload.js';
import Home from "./pages/home.jsx";

function App() {
  const orientation = useOrientation();

  return (
    <div className="App">
      <div className="main-container">
        <Routes>
          <Route path="/" exact element={<Home></Home>} />
          {/* <Route path="/Home" exact element={<Menu></Menu>} />
            <Route path="/MemoryUniverse" exact element={<MemoryUniverse></MemoryUniverse>} />
            <Route path="/MemoryUniverseResult" exact element={<MemoryUniverseResult></MemoryUniverseResult>} />
            <Route path="/DreamLamp" exact element={<DreamLamp></DreamLamp>} />
            <Route path="/DreamLampResult" exact element={<DreamLampResult></DreamLampResult>} /> */}
        </Routes>
      </div>
      {orientation.angle > 0 || orientation.angle < 0 ? (
        <div class="or-detect">
          <img src={Ori} alt=""></img>
        </div>
      ) : (
        <></>
      )}
      {/* <Preload></Preload> */}
    </div>
  );
}

export default App;
