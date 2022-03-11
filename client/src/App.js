import React, { useEffect, useState } from "react";
import "./App.css";
import TopNav from "./components/appbar.js";
import GoalSlider from "./components/goalSlider.js";
import { ContractManager } from "./controller/contractManager.js";
import { Button, Stack } from "@mui/material";

function App() {
  const { connectMetamask, moneyInPool, startFunding, giveFund, closeFunding, isloading  } =
    ContractManager();
  

  useEffect(() => {
    connectMetamask();
  }, []);

  if (isloading) {
    return (
      <div className="App">
        <header className="App-header"></header>
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="App">
        <header className="App-header"></header>
        <TopNav></TopNav>
        <GoalSlider value={moneyInPool ? moneyInPool : 0}></GoalSlider>
        <h1>Money in pool {moneyInPool} ETH</h1>
        <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={() => startFunding()}>
            Start Project Funding
          </Button>
          <Button variant="contained" onClick={() => giveFund()}>
            Give Fund
          </Button>
          <Button variant="contained" onClick={() => closeFunding()}>
            Close Project Funding
          </Button>
        </Stack>
      </div>
    );
  }
}

export default App;
