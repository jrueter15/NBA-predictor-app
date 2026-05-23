export async function getLast10Games(teamId) {
  const response = await fetch(
    `https://api.balldontlie.io/v1/games?team_ids[]=${teamId}&per_page=10`,
    {
      headers: {
        Authorization: import.meta.env.VITE_BALLDONTLIE_KEY
      }
    }
  );

  const data = await response.json();

    return sortByDate(data.data).slice(0, 10);
}

function sortByDate(games) {
  return [...games].sort(
    (a, b) => new Date(b.commence_time) - new Date(a.commence_time)
  );
}