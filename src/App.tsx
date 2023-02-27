import React, {useState} from 'react';
import './App.css';
import TopBar from "./components/TopBar";
import LeftBar from "./components/LeftBar";
import Main from "./components/Main";

function App() {

  return (
    <div className="App">
      <TopBar/>
      <main>
        <LeftBar/>
        <Main/>
      </main>
    </div>
  );
}

export default App;
