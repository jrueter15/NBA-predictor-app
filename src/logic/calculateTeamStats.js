export function calculateTeamStats(games, teamId) {
  let homeFor = 0;
  let homeAgainst = 0;
  let awayFor = 0;
  let awayAgainst = 0;

  let homeWeight = 0;
  let awayWeight = 0;

  const decay = 0.08 // how fast old games lose value

  games.forEach((game, index) => {
    const isHome = game.home_team.id === teamId;

    const weight = 1 - index * decay;

    if (isHome) {
      homeFor += game.home_team_score * weight;
      homeAgainst += game.away_team_score * weight;
      homeWeight += weight;
    } else {
      awayFor += game.away_team_score * weight;
      awayAgainst += game.home_team_score * weight;
      awayWeight += weight;
    }
  });

  return {
    homeAvgPointsFor: homeWeight ? homeFor / homeWeight : 0,
    homeAvgPointsAgainst: homeWeight ? homeAgainst / homeWeight : 0,
    
    awayAvgPointsFor: awayWeight ? awayFor / awayWeight : 0,
    awayAvgPointsAgainst: awayWeight ? awayAgainst / awayWeight : 0
  };
}