import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import Home from "./components/Home/Home";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import GameScreen from "./components/GameScreen/GameScreen";
import MainContent from "./components/Home/Content";
import Header from "./components/Header/Header";
import CharacterProvider from "./characters/CharacterProvider";

const LoadGameScreen = Loading(GameScreen);

const App = () => {
  return (
    <CharacterProvider>
      <Router basename="/">
        <Header />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<MainContent />} />
            <Route path="convention" element={<LoadGameScreen />} />
            <Route path="beach" element={<LoadGameScreen />} />
            <Route path="future" element={<LoadGameScreen />} />
          </Route>
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </Router>
    </CharacterProvider>
  );
};

export default App;
