import React, { useContext } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import CharacterContext from "../../characters/CharacterContext";
import styles from "../../styles/Form.module.css";

const Backdrop = ({ closeModal }) => {
  return <div className={styles.backdrop} onClick={closeModal}></div>;
};

const Form = ({ closeModal, endTime, resetTime }) => {
  const submitHandler = (e) => {
    e.preventDefault();
    closeModal();
    resetTime();
  };

  return (
    <div className={styles.form}>
      <h2>Good job!</h2>
      <h3>Your time: {endTime}</h3>
      <form onSubmit={submitHandler}>
        <label htmlFor="name">Enter your name: </label>
        <input id="name" type="text" />
        <button type="submit">Submit to Leaderboard</button>
      </form>
    </div>
  );
};

const Modal = () => {
  const { closeModal, isFinished, endTime, resetTime } =
    useContext(CharacterContext);

  return (
    <React.Fragment>
      {isFinished && (
        <div>
          {ReactDOM.createPortal(
            <Form
              closeModal={closeModal}
              endTime={endTime}
              resetTime={resetTime}
            />,
            document.getElementById("modal")
          )}
          {ReactDOM.createPortal(
            <Backdrop closeModal={closeModal} />,
            document.getElementById("backdrop")
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default Modal;

Backdrop.propTypes = {
  closeModal: PropTypes.func,
};

Form.propTypes = {
  closeModal: PropTypes.func,
  endTime: PropTypes.string,
  resetTime: PropTypes.func,
};
