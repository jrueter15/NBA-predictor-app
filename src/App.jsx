import { useEffect, useState } from "react";

export default function App(){
  // component - JS function that return UI (jsx)
  // state, functions, logic

  const [message, setMessage] = useState("Loading...");
  const [games, setGames] = useState([]);

  useEffect(() => {
    console.log("App mounted");
    setMessage("React is working!");
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

  return(
    // Return statement is the UI
    <div>
      <h1>NBA Predictor</h1>

      <input type="date"/>

      <button onClick={loadGames}>Load Games</button>
        {games.map(game => {
          const firstBook = game.bookmakers?.[0];

          const totalsMarket = firstBook?.markets?.find(
            market => market.key === "totals"
          );
          
          const spreadsMarket = firstBook?.markets?.find(
            market => market.key === "spreads"
          );

          const h2hMarket = firstBook?.markets?.find(
            market => market.key === "h2h"
          );

          const over =
            totalsMarket?.outcomes?.find(
              outcome => outcome.name === "Over"
            );

          const under =
            totalsMarket?.outcomes?.find(
              outcome => outcome.name === "Under"
            );

          const homeSpread =
            spreadsMarket?.outcomes?.find(
              outcome => outcome.name === game.home_team
            );

          const homeML =
            h2hMarket?.outcomes?.find(
              outcome => outcome.name === game.home_team
            );

          const awayML =
            h2hMarket?.outcomes?.find(
              outcome => outcome.name === game.away_team
            );

        return(
          <div key={game.id}>
            <h3>{game.away_team} @ {game.home_team}</h3>

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
          </div>
        )
      })}
    </div>
  );
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
  alert("App started");

  const[games, setGames] = useState([]);

  console.log("App started");

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
        
        games.map(game => {

          const firstBook = game.bookmakers?.[0];

          const totalsMarket = firstBook?.markets?.find(
            market => market.key === "totals"
          );
          
          const spreadsMarket = firstBook?.markets?.find(
            market => market.key === "spreads"
          );

          const h2hMarket = firstBook?.markets?.find(
            market => market.key === "h2h"
          );

          const over =
            totalsMarket?.outcomes?.find(
              outcome => outcome.name === "Over"
            );

          const under =
            totalsMarket?.outcomes?.find(
              outcome => outcome.name === "Under"
            );

          const homeSpread =
            spreadsMarket?.outcomes?.find(
              outcome => outcome.name === game.home_team
            );

          const homeML =
            h2hMarket?.outcomes?.find(
              outcome => outcome.name === game.home_team
            );

          const awayML =
            h2hMarket?.outcomes?.find(
              outcome => outcome.name === game.away_team
            );

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

// Fetch odds
async function fetchOdds() {
  const response = await fetch(
    "https://api.the-odds-api.com/v4/sports/basketball_nba/odds?regions=us&markets=spreads,totals,h2h&apiKey=43df2322173d88a1be8f6588fd399c7a"
  );

  console.log("Odds status:", response.status);

  const text = await response.text();
  console.log("Raw odds response:", text);

  if (!response.ok) {
    throw new Error(`Odds fetch failed: ${response.status}`);
  }

  return JSON.parse(text);
}

function getMarket(bookmaker, key) {
  return bookmaker.markets.find(
    market => market.key === key
  );
}

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

// Helper for data filtering
function filterGamesByDate(games, selectedDate){
  return games.filter(game => {
    const gameDate = new Date(game.commence_time);
    
    const localDate = new Date(gameDate.getTime() - gameDate.getTimezoneOffset() * 60000
  ).toISOString().split("T")[0];
    
  return localDate === selectedDate;
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