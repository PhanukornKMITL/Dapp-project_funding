import React, { useEffect, useState } from "react";
import "./App.css";
import TopNav from "./components/appbar.js";
import GoalSlider from "./components/goalSlider.js";
import { ContractManager } from "./controller/contractManager.js";
import { Button, Stack, Grid, Box } from "@mui/material";
import { spacing } from '@mui/system';

function App() {
  const { connectMetamask, moneyInPool, startFunding, giveFund, closeFunding, isloading, accounts } =
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
        <TopNav accountId={accounts[0]}></TopNav>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center">
          <Stack spacing={2} direction="column">
            <GoalSlider value={moneyInPool ? moneyInPool : 0}></GoalSlider>
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
          </Stack>

        </Box>


      </div>
    );
  }
}

export default App;
