import React, { useState, useEffect, createContext } from 'react';
import Div100vh from 'react-div-100vh';
import UserLogin from './components/UserLogin';
import GameBoard from './components/GameBoard';
import EndOfGame from './components/EndOfGame';
import peeps from './data/Peeps';
import words from './data/Words';
import $ from 'jquery';
import {
  canCopyImagesToClipboard,
  requestClipboardWritePermission,
} from 'copy-image-clipboard';
import { randomWord, checkWord } from './functions/index';
import { startOver } from './functions/StartOver';
import logo from './assets/wwLogo.png';
import styles from './App.module.scss';

export const UserContext = createContext();
export const WordsContext = createContext();
export const PeepsContext = createContext();

function App() {
  const [answer, setAnswer] = useState('');
  const [guessIndex, setGuessIndex] = useState(0);
  const [guesses, setGuesses] = useState([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ]);
  const [userModalShow, setUserModalShow] = useState(true);
  const [endModalShow, setEndModalShow] = useState(false);
  const [peep, setPeep] = useState({});
  const [canWrite, setCanWrite] = useState(false);
  const [shareableImage, setShareableImage] = useState();

  const newGame = () => {
    startOver(setAnswer, setGuesses, setGuessIndex, setEndModalShow);
  };

  const makeGuess = (playerGuess) => {
    const guessLength = playerGuess.length;
    const params = {
      playerGuess,
      answer,
      guessIndex,
      setGuessIndex,
      setEndModalShow,
      peep: peep.name,
      guesses,
      canWrite,
      shareableImage,
      setShareableImage,
    };
    switch (guessLength) {
      case 5:
        checkWord(params);
        break;
      default:
        $(`.shakeableG${guessIndex}`).addClass('shake');
    }
  };

  useEffect(() => {
    const secretWord = randomWord();
    const wordle = secretWord.toUpperCase();
    setAnswer(wordle);
    console.log(wordle);
    const canCopy = canCopyImagesToClipboard();
    let writePermission = false;
    requestClipboardWritePermission()
      .then((hasPermission) => {
        writePermission = hasPermission;
      })
      .then(() => {
        if (canCopy && writePermission) {
          setCanWrite(true);
        }
      });
  }, []);

  return (
    <Div100vh className={styles.app}>
      <UserContext.Provider value={peep}>
        <WordsContext.Provider value={words}>
          <PeepsContext.Provider value={peeps}>
            <UserLogin
              show={userModalShow}
              setShow={setUserModalShow}
              setPeep={setPeep}
              setAnswer={setAnswer}
            />
            <EndOfGame
              show={endModalShow}
              setShow={setEndModalShow}
              answer={answer}
              newGame={newGame}
              guesses={guesses}
              guessIndex={guessIndex}
              canWrite={canWrite}
              shareableImage={shareableImage}
            />
            <div className={styles.header}>
              <img src={logo} className={styles.logo} alt="logo" />
              <h3>Withers Wordle</h3>
            </div>
            <GameBoard
              guesses={guesses}
              setGuesses={setGuesses}
              guessIndex={guessIndex}
              makeGuess={makeGuess}
            />
          </PeepsContext.Provider>
        </WordsContext.Provider>
      </UserContext.Provider>
    </Div100vh>
  );
}

export default App;
