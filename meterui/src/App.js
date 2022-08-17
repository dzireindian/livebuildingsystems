import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

import Home from './Components/Home/Home';
import Dashboard from './Components/Dashboard/Dashboard';

import {Routes,Navigate,BrowserRouter,Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/Dashboard/:id/:label/" element={<Dashboard/>} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
