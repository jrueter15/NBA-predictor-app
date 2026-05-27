import { useEffect, useState } from "react";
import {generateTotalInsight} from "./logic/insights.js";
import {getTeamGames} from "./api/statsApi.js";
import {calculateAveragePoints} from "./logic/averages.js";

function App(){

  console.log("App started");

  const [games, setGames] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData(){
    console.log("loading games...");
  }

  return(
    <div>
      <h1>NBA Predictor</h1>

      {games.map(game => (
        <div key={game.id}>
          {game.away_team} @ {game.home_team}
        </div>
      ))}
      
    </div>
  );
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

testStats();
