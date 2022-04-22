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

const sliceText = (str) => {
  return str.slice(0, str.lastIndexOf("."));
};

const App = () => {
  const [images, setImages] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getImage = async () => {
    setIsLoading(false);
    const response = await storage.ref().child("images").listAll();
    const imageLinks = response.items.map(async (imageRef) => {
      const url = await imageRef.getDownloadURL();
      const name = sliceText(imageRef.name);
      return { url, name };
    });
    return Promise.all(imageLinks);
  };

  const storeImages = async () => {
    const links = await getImage();
    links.forEach((link) => {
      setImages((state) => {
        return {
          ...state,
          [link.name]: {
            name: link.name,
            url: link.url,
          },
        };
      });
    });
  };

  useEffect(() => {
    setIsLoading(true);
    storeImages();
  }, []);

  return (
    <React.Fragment>
      <Router basename="/">
        <Header />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<MainContent images={images} />} />
            <Route
              path="convention"
              element={
                <LoadGameScreen
                  image={images.Convention}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="beach"
              element={
                <LoadGameScreen image={images.Beach} isLoading={isLoading} />
              }
            />
            <Route
              path="future"
              element={
                <LoadGameScreen image={images.Future} isLoading={isLoading} />
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
