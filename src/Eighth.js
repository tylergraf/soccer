import React from "react";
import { Box, Heading, Text } from "grommet";
const fivePlayers = players => {
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
  let eighthPlayers = shiftPlayers(players, eighth);
  eighthPlayers = fivePlayers(eighthPlayers);

  const goalie = eighthPlayers.shift();
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
          {eighthPlayers.map(player => (
            <Text size="large" margin="none" as="p" key={player}>
              {player}
            </Text>
          ))}
        </Box>
      </Box>
    </div>
  );
}

export default Eighth;
