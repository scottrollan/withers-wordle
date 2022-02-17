import React, { useState, useContext } from 'react';
import { UserContext, PeepsContext } from '../App';
import { Modal, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import styles from './UserLogin.module.scss';

export default function UserLogin({ show, setShow, setPeep }) {
  const peep = useContext(UserContext);
  const peeps = useContext(PeepsContext);

  const userTrue = () => {
    setShow(false);
  };
  const setMyName = (p) => {
    setPeep({ ...p });
  };

  const moreStyles = {
    instructions: {
      display: peep.name ? 'none' : 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    letters: {
      display: 'flex',
      flexDirection: 'row',
    },
    tile: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '2px solid black',
      borderRadius: 'none',
      height: '32px',
      width: '32px',
      fontWeight: 600,
      margin: '0 3px',
    },
    greenTile: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '2px solid black',
      borderRadius: 'none',
      height: '32px',
      width: '32px',
      fontWeight: 600,
      margin: '0 3px',
      backgroundColor: 'var(--green)',
      color: 'white',
    },
    yellowTile: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '2px solid black',
      borderRadius: 'none',
      height: '32px',
      width: '32px',
      fontWeight: 600,
      margin: '0 3px',
      backgroundColor: 'var(--puke-yellow)',
      color: 'white',
    },
    grayTile: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '2px solid black',
      borderRadius: 'none',
      height: '32px',
      width: '32px',
      fontWeight: 600,
      backgroundColor: 'var(--dark-gray)',
      color: 'white',
    },
    buttons: {
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      display: peep.name ? 'flex' : 'none',
    },
    peepSelect: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    whichPeep: {
      visibility: peep.name ? 'hidden' : 'visible',
    },
    whichPeepButton: {
      backgroundColor: 'var(--purple)',
    },
  };

  return (
    <Modal show={show} dialogClassName="modal-90h">
      <Modal.Header>
        <Modal.Title>
          Guess the <strong>WITHERS WORD</strong> in 6 tries.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          After each guess the color of the tiles will change to show how close
          you got.
        </p>
        <hr style={{ borderTop: '1px solid black' }} />
        <div style={moreStyles.instructions}>
          <h5>Examples</h5>
          <div style={moreStyles.letters}>
            <div style={moreStyles.greenTile}>B</div>
            <div style={moreStyles.tile}>A</div>
            <div style={moreStyles.tile}>K</div>
            <div style={moreStyles.tile}>E</div>
            <div style={moreStyles.tile}>S</div>
          </div>
          <p>
            The letter <strong>B</strong> is in the word and in the correct
            spot.
          </p>
          <div style={moreStyles.letters}>
            <>
              <div style={moreStyles.tile}>P</div>
              <div style={moreStyles.yellowTile}>O</div>
              <div style={moreStyles.tile}>U</div>
              <div style={moreStyles.tile}>N</div>
              <div style={moreStyles.tile}>D</div>{' '}
            </>
          </div>
          <p>
            The letter <strong>O</strong> is in the word but in the wrong spot.
          </p>
          <div style={moreStyles.letters}>
            <div style={moreStyles.tile}>C</div>
            <div style={moreStyles.tile}>A</div>
            <div style={moreStyles.tile}>K</div>
            <div style={moreStyles.grayTile}>E</div>
            <div style={moreStyles.tile}>S</div>
          </div>
          <p>
            The letter <strong>E</strong> is not in the word in any spot.
          </p>
        </div>
        <div style={moreStyles.buttons}>
          <Button onClick={() => userTrue()} variant="success">
            {peep.name}, Click Here To Play Withers Wordle
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div style={moreStyles.peepSelect}>
          <div style={moreStyles.whichPeep}>Which Withers you is?</div>
          <DropdownButton
            title={`I Am ${peep.name ? peep.name : '...'}`}
            drop="start"
            className={styles.whichPeepButton}
          >
            {peeps.map((p) => {
              return (
                <Dropdown.Item
                  key={p.name}
                  eventKey={p.name}
                  value={p.name}
                  onClick={() => setMyName(p)}
                >
                  {p.name}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
