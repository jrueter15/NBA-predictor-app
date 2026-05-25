export default function GameCard({
  game,
  projectedTotal,
  sportsbookTotal
}) {

  const lean =
    projectedTotal > sportsbookTotal
      ? "OVER"
      : "UNDER";

  return (
    <div className="game-card">

      <h2>
        {game.away_team} @ {game.home_team}
      </h2>

      <p>
        Sportsbook Total:
        {sportsbookTotal}
      </p>

      <p>
        Projected Total:
        {projectedTotal.toFixed(1)}
      </p>

      <p>
        Lean: {lean}
      </p>

    </div>
  );
}