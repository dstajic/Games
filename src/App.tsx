import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import CoinFlip from "./components/CoinFlip";
import TicTacToe from "./components/TicTacToe";
import Snake from "./components/Snake";

function App() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div>
      <h1 className="Title">GAMES</h1>

      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab id="Tab1">Tic-Tac Toe</Tab>
          <Tab id="Tab2">CoinFlip</Tab>
          <Tab id="Tab3">Snake</Tab>
        </TabList>

        <TabPanel>
          <TicTacToe></TicTacToe>
        </TabPanel>
        <TabPanel>
          <CoinFlip></CoinFlip>
        </TabPanel>
        <TabPanel>
          <Snake></Snake>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default App;
