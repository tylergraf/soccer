import React from "react";
import { Box, Heading, Text } from "grommet";
const limit5Players = players => {
  const tempPlayers = [...players];
  return tempPlayers.slice(0, 5);
};
const shiftPlayers = (players, eighth) => {
  if (!players.length) return players;
  if (eighth === 1) return players;
  const tempPlayers = [...players];
  const arrLength = players.length > 5 ? (eighth - 1) * 5 : 1 * eighth - 1;
  Array.from(new Array(arrLength)).forEach(() => {
    const player = tempPlayers.shift();
    tempPlayers.push(player);
  });
  return tempPlayers;
};

function Eighth({ players, eighth }) {
  const eighthPlayers = shiftPlayers(players, eighth);
  const fivePlayers = limit5Players(eighthPlayers);
  const outPlayers = players.filter(p => !fivePlayers.includes(p));
  const goalie = fivePlayers.shift();
  return (
    <div>
      <Box
        direction="row"
        margin="medium"
        pad="medium"
        justify="around"
        border={{ color: "brand", size: "large" }}
      >
        <Box>
          <Heading level="2" margin="none">
            Goalie
          </Heading>
          <Text size="large" margin="none" as="p">
            {goalie}
          </Text>
        </Box>
        <Box>
          <Heading level="2" margin="none">
            Other Players
          </Heading>
          {fivePlayers.map(player => (
            <Text size="large" margin="none" as="p" key={player}>
              {player}
            </Text>
          ))}
        </Box>
      </Box>

      <Box margin="medium" pad="medium" border={{ color: "accent-4", size: "large" }}>
        <Heading level="2" margin="none">
          Players Sitting Out
        </Heading>
        {outPlayers.map(player => (
          <Text size="large" margin="none" as="p" key={player}>
            {player}
          </Text>
        ))}
      </Box>
    </div>
  );
}

export default Eighth;
