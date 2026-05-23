export function calculateTeamStats(games, teamId) {
  let homeFor = 0;
  let homeAgainst = 0;
  let awayFor = 0;
  let awayAgainst = 0;

  let homeGames = 0;
  let awayGames = 0;

  games.forEach(game => {
    const isHome = game.home_team.id === teamId;

    if (isHome) {
      homeFor += game.home_team_score;
      homeAgainst += game.away_team_score;
      homeGames++;
    } else {
      awayFor += game.away_team_score;
      awayAgainst += game.home_team_score;
      awayGames++;
    }
  });

  return {
    homeAvgPointsFor: homeGames ? homeFor / homeGames : 0,
    homeAvgPointsAgainst: homeGames ? homeAgainst / homeGames : 0,
    awayAvgPointsFor: awayGames ? awayFor / awayGames : 0,
    awayAvgPointsAgainst: awayGames ? awayAgainst / awayGames : 0
  };
}