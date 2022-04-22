import React, { useState, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import firebase from "firebase/compat/app";
import { firestore, storage } from "./firebase";
import Loading from "./components/Loading";
import Home from "./components/Home/Home";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import GameScreen from "./components/GameScreen/GameScreen";
import MainContent from "./components/Home/Content";
import Header from "./components/Header/Header";

const LoadGameScreen = Loading(GameScreen);

const App = () => {
  const [imageURL, setImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getImage = async () => {
    const imageRef = storage.ref("image1.jpg");
    const data = await imageRef.getDownloadURL();

    setImageURL(data);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getImage();
  }, []);

  return (
    <React.Fragment>
      <Router basename="/">
        <Header />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<MainContent imageURL={imageURL} />} />
            <Route
              path="convention"
              element={
                <LoadGameScreen imageURL={imageURL} isLoading={isLoading} />
              }
            />
          </Route>
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
};

export default App;
