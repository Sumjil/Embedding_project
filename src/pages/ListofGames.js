import React from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie'; // Import the Lottie component
import pandaAnimation from '../assets/animations/Runny.json'; // Import your Lottie animation JSON file
import '../App.css';
import './GameList.css'

const ListofGames = () => {
  // Options for Lottie animation
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: pandaAnimation, // Your Lottie animation JSON
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="GameList"> {/* Use the class GameList */}
      <h2>Available Games</h2>
      <ul>
        <li>
          <Link to="/game">Password (Guess a word) (level 1)</Link>
        </li>
        <li>
          <Link to="/game_gpt">Password (Guess a word) (level 2)</Link>
        </li>
        <li>
          <Link to="/game_bert">Password (Guess a word) (level 3)</Link>
        </li>
      </ul>
      <Lottie options={defaultOptions} height={400} width={400} /> {/* Render the Lottie component */}
    </div>
  );
}

export default ListofGames;
