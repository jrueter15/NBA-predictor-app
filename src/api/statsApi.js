export async function getTeamGames(teamId) {

  const response = await fetch(
    `https://api.balldontlie.io/v1/games?team_ids[]=${teamId}&per_page=10`,
  
    {
        headers: {
            Authorization:
              import.meta.env.VITE_BALLDONTLIE_KEY
        }
    }
);

  const data = await response.json();

  return data.data;
}