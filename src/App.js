import React, { useState, useEffect } from 'react';
import boom from './assets/sounds/boom.wav';
import clap from './assets/sounds/clap.wav';
import hihat from './assets/sounds/hihat.wav';
import kick from './assets/sounds/kick.wav';
import openhat from './assets/sounds/openhat.wav';
import ride from './assets/sounds/ride.wav';
import snare from './assets/sounds/snare.wav';
import tink from './assets/sounds/tink.wav';
import tom from './assets/sounds/tom.wav';
import './App.css';

const playKeys = [
  {
    keyCode: 81,
    key: 'Q',
    id: 'boom',
    src: boom,
  },
  {
    keyCode: 87,
    key: 'W',
    id: 'clap',
    src: clap,
  },
  {
    keyCode: 69,
    key: 'E',
    id: 'hihat',
    src: hihat,
  },
  {
    keyCode: 65,
    key: 'A',
    id: 'kick',
    src: kick,
  },
  {
    keyCode: 83,
    key: 'S',
    id: 'openhat',
    src: openhat,
  },
  {
    keyCode: 68,
    key: 'D',
    id: 'ride',
    src: ride,
  },
  {
    keyCode: 90,
    key: 'Z',
    id: 'snare',
    src: snare,
  },
  {
    keyCode: 88,
    key: 'X',
    id: 'tink',
    src: tink,
  },
  {
    keyCode: 67,
    key: 'C',
    id: 'tom',
    src: tom,
  },
];

const Keyboard = ({ play, displaySound }) => {
  return playKeys.map((item) => {
    return (
      <SingleKey
        item={item}
        play={play}
        key={item.key}
        displaySound={displaySound}
      />
    );
  });
};

const SingleKey = ({ item: { keyCode, key, src, id }, play, displaySound }) => {
  const handleClick = (e) => {
    if (keyCode === e.keyCode) {
      displaySound(id);
      play(key);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleClick);

    return () => {
      document.removeEventListener('keydown', handleClick);
    };
  });

  return (
    <button
      className="drum-pad"
      id={id}
      onClick={() => play(key, displaySound(id))}
    >
      <audio className="clip" type="audio/wav" id={key} src={src} />
      {key}
    </button>
  );
};

const App = () => {
  const [soundName, setSoundName] = useState();

  const ActiveKey = (key) => {
    key.parentElement.style.backgroundColor = '#a9a9a9';
    key.parentElement.style.color = '#ffffff';
  };

  const DefaultKey = (key) => {
    setTimeout(() => {
      key.parentElement.style.backgroundColor = '#ffffff';
      key.parentElement.style.color = '#000000';
    }, 500);
  };

  const playSound = (sound) => {
    const audio = document.getElementById(sound);
    ActiveKey(audio);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    DefaultKey(audio);
  };

  return (
    <div id="drum-machine">
      <div id="display">{soundName}</div>
      <Keyboard play={playSound} displaySound={setSoundName} />
      <p className="text">Enjoy your new drum machine!</p>
    </div>
  );
};

export default App;
