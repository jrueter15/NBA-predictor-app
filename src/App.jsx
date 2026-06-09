import { useEffect, useState } from "react";

export default function App(){
  // component - JS function that return UI (jsx)
  // state, functions, logic

  const [games, setGames] = useState([]);

  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    return today.toISOString().split("T")[0]
  });

  const filteredGames = games.filter(game => {
    const gameDate = new Date(game.commence_time);

    const localDate = new Date(
      gameDate.getTime() - gameDate.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];

    return localDate === selectedDate;
  });

  console.log("Selected date:", selectedDate);

  games.forEach(game => {
    console.log(
      "Game date:",
      game.commence_time,
      "=>",
      game.commence_time.split("T")[0]
    );
  });  

  useEffect(() => {
    console.log("App mounted");
    loadGames();
  }, []);

  async function loadGames(){
    console.log("Load Games clicked");

    try{
      const data = await fetchOdds();

      console.log(data[0]);

      console.log(data);

      setGames(data);
    } catch (err) {
      console.error(err);
    }
  }

return (
  <div>
    <h1>NBA Predictor</h1>

    <div className="odds-legend">
      <h3>How to Read the Odds</h3>

      <p>
        <strong>Spread:</strong> The predicted margin of victory. 
        Example: +6.5 means the team can lose by 6 and still cover the spread.
      </p>

      <p>
        <strong>Total:</strong> The expected combined score of both teams.
      </p>

      <p>
        <strong>Odds:</strong> The number shows your payout multiplier.
        Example: 1.83 means a $10 bet returns $18.30 total ($8.30 profit).
        Higher odds = bigger payout but less likely outcome.
      </p>
    </div>

    <div className="controls">
      <input 
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="date-picker"
      />

      <button onClick={loadGames} className="load-button">
        Load Games
      </button>
    </div>

    {filteredGames.length === 0 ? (
      <div className="empty-state">
        No games found for this date.
      </div>
    ) : (
      filteredGames.map(game => {
        

      return(

        <div key={game.id} className="game-card">
          <h2>
            {game.away_team} @ {game.home_team}
          </h2>

        {(() => {
          const { highest, lowest } =
            getHighestLowestTotal(game);

          if (!highest || !lowest) {
            return null;
          }

          return (
            <div className="insight">
              <p>
                Highest Total: {highest.total} ({highest.book}) - Odds {highest.price}
              </p>

              <p>
                Lowest Total: {lowest.total} ({lowest.book}) - Odds {lowest.price}
              </p>
            </div>
          );
        })()}

          {game.bookmakers?.map(book => {
            const totalsMarket = getMarket(book, "totals");
            const spreadsMarket = getMarket(book, "spread");
            const h2hMarket = getMarket(book, "h2h");

            const totalOutcomes = totalsMarket?.outcomes ?? [];
            const spreadOutcomes = spreadsMarket?.outcomes ?? [];
            const moneylineOutcomes = h2hMarket?.outcomes ?? [];

            return (
              <div key={book.key} className="book-card" style={{ marginBottom: "16px" }}>
                <strong>{book.title}</strong>

                <div className="markets-row">

                  <div className="market-column">
                    <h4>Spreads</h4>

                    {spreadOutcomes.map(outcome => (
                      <p key={outcome.name}>
                        {outcome.name}: {outcome.point} ({outcome.price})
                      </p>
                    ))}
                  </div>

                  <div className="market-column">
                    <h4>Totals</h4>

                    {totalOutcomes.map(outcome => (
                      <p key={outcome.name}>
                        {outcome.name}: {outcome.point} ({outcome.price})
                      </p>
                    ))}
                  </div>

                  <div className="market-column">
                    <h4>Moneyline</h4>                    

                    {moneylineOutcomes.map(outcome => (
                      <p key={outcome.name}>
                        {outcome.name}: {outcome.price}
                      </p>
                    ))}
                  </div>

                </div>

              </div>
            );

          })}
        </div>
      );
    })
    )}
  </div>
);

// Helper function for getting a market
function getMarket(book, key) {
  return book.markets.find(
    market => market.key === key
  );
}

function getHighestLowestTotal(game){
  const overLines = game.bookmakers
    ?.map(book => {
      const totalsMarket = getMarket(book, "totals");

      const over = totalsMarket?.outcomes?.find(
        outcome => outcome.name === "Over"
      );

      if (!over) return null;
        
      return{
        book: book.title,
        total: over.point,
        price: over.price
      };
    })
    .filter(Boolean);

    if (!overLines || overLines.length === 0){
      return {
        highest: null,
        lowest: null
      };
    }

    return {
      highest: overLines.reduce((highest, current) =>
        current.total > highest.total
          ? current
          : highest
      ),

      lowest: overLines.reduce((lowest, current) =>
        current.total < lowest.total
          ? current
          : lowest
      )
    };
}
}

// Helper fetchOdds function
async function fetchOdds(){
  const response = await fetch(
    `https://api.the-odds-api.com/v4/sports/basketball_nba/odds?regions=us&markets=spreads,totals,h2h&apiKey=${import.meta.env.VITE_ODDS_API_KEY}`
  );

  if(!response.ok){
    throw new Error(`Odds fetch failed: ${response.status}`);
  }

  return response.json();
}


//import "./App.css";
//import {generateTotalInsight} from "./logic/insights.js";
//import {getTeamGames} from "./api/statsApi.js";
//import {calculateAveragePoints} from "./logic/averages.js";


{/*

function App(){

  const[games, setGames] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData(){
    console.log("Load button clicked");
    try{
      const oddsData = await fetchOdds();

      console.log("Odds loaded:", oddsData);

      setGames(oddsData);

    }catch(err){
      console.error("Failed to load odds: ", err);
    }
  }

  return(
    <div className="app">

      <h1>NBA Predictor</h1>

      {games.length === 0 ? (

        <p>Loading games...</p>

      ) : (


          return (

            <div key={game.id} className="game-card">

              <h2>
                {game.away_team} @ {game.home_team}
              </h2>

              <p>
                <strong>Total:</strong>{" "}
                {over?.point ?? "N/A"}
              </p>

              <p>
                <strong>Spread:</strong>{" "}
                {homeSpread?.point ?? "N/A"}
              </p>

              <p>
                <strong>Moneyline:</strong>
              </p>

              <p>
                {game.home_team}:{" "}
                {homeML?.price ?? "N/A"}
              </p>

              <p>
                {game.away_team}:{" "}
                {awayML?.price ?? "N/A"}
              </p>

              <hr />

            </div>
          );
        })
      )}
    </div>
  );
}

export default App;

// Fetch odds
async function fetchOdds() {
  console.log("Fetching odds...");
  console.log("Response:", response.status);

  const response = await fetch(
    `https://api.the-odds-api.com/v4/sports/basketball_nba/odds?regions=us&markets=spreads,totals,h2h&apiKey=${import.meta.env.VITE_ODDS_API_KEY}`
  );

  if (!response.ok) {
    throw new Error(
      `Odds fetch failed: ${response.status}`
    );
  }

  return response.json();
}


        })
      )}

      {games.map(game => {





        const over = totalsMarket?.outcomes?.find(
          outcome => outcome.name === "Over"
        );

        return(
          
          
          Sportsbook Total: {over?.point ?? "N/A"}
        )

        <div key={game.id}>
          {game.away_team} @ {game.home_team}
        </div>
      ))}
      
    </div>
  );
}
}

export default App;

const fakeGame = {
  homeAvgPoints: 115,
  awayAvgPoints: 112,
  total: 221.5
};

const insight = generateTotalInsight(fakeGame);

console.log(insight);



// Extract spread
function getMarketData(oddsGame) {
  if (!oddsGame || !oddsGame.bookmakers) return [];

  return oddsGame.bookmakers.map(book => {
    const spreadsMarket = getMarket(book, "spreads");
    const totalsMarket = getMarket(book, "totals");
    const moneylineMarket = getMarket(book, "h2h");

    // Spread
    const homeSpread = spreadsMarket?.outcomes.find(
      o => o.name === oddsGame.home_team
    );

    // Totals
    const over = totalsMarket?.outcomes.find(
      o => o.name === "Over"
    );

    const under = totalsMarket?.outcomes.find(
      o => o.name === "Under"
    );

    // Moneylines
    const homeML = moneylineMarket?.outcomes.find(
      o => o.name === oddsGame.home_team
    );

    const awayML = moneylineMarket?.outcomes.find(
      o => o.name === oddsGame.away_team
    );

    return{
      book: book.title,

      spread: homeSpread?.point,
      spreadPrice: homeSpread?.price,

      total: over?.point,
      overPrice: over?.price,
      underPrice: under?.price,

      homeML: homeML?.price,
      awayML: awayML?.price
    }
  })
}

async function getActiveSports() {
  const response = await fetch("https://api.the-odds-api.com/v4/sports?apiKey=43df2322173d88a1be8f6588fd399c7a");
  const data = await response.json();

  // Filter only in-season sports
  const activeSports = data.filter(sport => sport.active);

  console.log(activeSports);
  return activeSports;

  const formattedSports = activeSports.map(sport => ({
  key: sport.key,
  title: sport.title
  }));

  console.log(formattedSports);
}


async function testStats() {

  const games =
    await getTeamGames(2);

  const avg =
    calculateAveragePoints(
      games,
      "Boston Celtics"
    );

  console.log(avg);
}
*/}