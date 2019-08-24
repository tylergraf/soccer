import React, { useState, useEffect } from "react";
import "./App.css";
import Eighth from "./Eighth";
import {
  Grommet,
  Button,
  Tabs,
  Tab,
  Box,
  Heading,
  Text,
  CheckBox
} from "grommet";

const theme = {
  name: "my theme",
  rounding: 4,
  spacing: 24,
  global: {
    colors: {},
    font: {
      family: "Raleway"
    }
  }
};

const possiblePlayers = [
  "Truman",
  "Kohen",
  "Fisher",
  "Robby",
  "Nixon",
  "Benjamin",
  "Liam",
  "Tage"
];

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [players, setPlayers] = useState([]);
  const [eighth, setEighth] = useState(1);

  useEffect(() => {
    const players = localStorage.players || "";
    const eighth = localStorage.eighth || 1;
    const activeIndex = localStorage.activeIndex || 1;
    setPlayers(
      players
        .split(",")
        .map(p => p && p.trim())
        .filter(Boolean)
    );
    setEighth(Number(eighth));
    setActiveIndex(Number(activeIndex));
  }, []);
  const toggleName = name => {
    let tempPlayers = [];
    if (players.includes(name)) {
      tempPlayers = players.filter(p => p !== name);
    } else {
      tempPlayers = [name, ...players];
    }
    setPlayers(tempPlayers);
    localStorage.players = tempPlayers;
  };
  const handleClick = up => {
    let newEighth;
    if (up) {
      newEighth = eighth + 1;
    } else {
      newEighth = eighth - 1;
    }
    if (newEighth < 1 || newEighth > 8) return;
    setEighth(newEighth);
    localStorage.eighth = newEighth;
  };
  return (
    <Grommet theme={theme}>
      <Box background="brand" pad="medium" align="center">
        <header>
          <Heading margin="none" level="1">
            Soccer
          </Heading>
        </header>
      </Box>
      <Tabs
        activeIndex={activeIndex}
        onActive={index => {
          setActiveIndex(index);
          localStorage.activeIndex = index;
        }}
      >
        <Tab title="Players" background="brand">
          <Box>
            <Box pad="medium">
              {possiblePlayers.map(name => (
                <CheckBox
                  key={name}
                  label={name}
                  checked={players.includes(name)}
                  onChange={() => toggleName(name)}
                ></CheckBox>
              ))}
            </Box>
            <Box pad="medium" align="center">
              <Heading level="2" margin="none">
                Total: {players.length}
              </Heading>
            </Box>
            <Box
              margin="medium"
              pad="medium"
              border={{ color: "brand", size: "large" }}
            >
              {players.length
                ? players.map(player => (
                    <Text size="large" margin="none" as="p" key={player}>
                      {player}
                    </Text>
                  ))
                : null}
            </Box>
          </Box>
        </Tab>
        <Tab title="Game">
          <Box>
            <Box direction="row" align="center" justify="around">
              <div>
                <Button
                  color="brand"
                  label="Prev"
                  onClick={() => handleClick()}
                />
              </div>
              <h2>Eighth: {eighth}</h2>
              <div>
                <Button
                  color="brand"
                  label="Next"
                  onClick={() => handleClick(true)}
                />
              </div>
            </Box>
            <Eighth players={players} eighth={eighth}></Eighth>
          </Box>
        </Tab>
      </Tabs>
    </Grommet>
  );
}

export default App;
