import React, { useState, useRef, useEffect } from "react";
import styles from "../../styles/Leaderboard.module.css";
import { firestore } from "../../firebase";
import { formattedTime } from "../../helper/formatTime";

const filterLeaderboard = (array, name, tab) => {
  tab.classList.add(styles.active);
  return array.filter((item) => item.map === name);
};

const removeActive = (array) => {
  array.forEach((item) => {
    item.classList.remove(styles.active);
  });
};

const compareFunction = (a, b) => {
  return a.time - b.time;
};

const Leaderboard = () => {
  const [tab, setTab] = useState();
  const [currentTab, setCurrentTab] = useState(tab);
  const tabRef = useRef();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const response = firestore.collection("leaderboard");
      const data = await response.get();

      const list = data.docs.map((item) => {
        return item.data();
      });

      setTab(list);
      setCurrentTab(
        filterLeaderboard(list, "Beach", tabRef.current.children[0])
      );
    };

    fetchLeaderboard();
  }, []);

  const tabChangeHandler = (e) => {
    removeActive([...tabRef.current.children]);
    setCurrentTab(filterLeaderboard(tab, e.target.id, e.target));
  };

  const renderItems = () => {
    return currentTab.sort(compareFunction).map((item, index) => {
      return (
        <div key={index} className={styles["leaderboard-row"]}>
          <div className={styles["leaderboard-col"]}>
            <p>
              <strong>{item.name}</strong> took{" "}
              <strong>{formattedTime(item.time)}</strong> to complete
            </p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className={styles.leaderboard}>
      <h1>Leaderboard</h1>
      <nav className={styles.navbar}>
        <ul ref={tabRef}>
          <li id="Beach" onClick={tabChangeHandler}>
            Beach
          </li>
          <li id="Convention" onClick={tabChangeHandler}>
            Convention
          </li>
          <li id="Future" onClick={tabChangeHandler}>
            Future
          </li>
        </ul>
      </nav>
      <div className={styles["leaderboard-list"]}>
        {currentTab && renderItems()}
      </div>
    </div>
  );
};

export default Leaderboard;
