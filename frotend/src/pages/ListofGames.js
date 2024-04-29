import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie'; // Import the Lottie component
import pandaAnimation from '../assets/animations/Runny.json'; // Import your Lottie animation JSON file
import '../App.css';
import './GameList.css'
import { Modal, Button } from 'antd'; // Import the modal and button from antd
import Header from '../assets/components/Header'; // Import the Header component

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
    <div>
      <Header/>
      <div className="GameList"> {/* Use the class GameList */}
        <h2>Semantic Game</h2>
        <ul>
          <li>
            <Link to="/game">Guess a word (Round 1)</Link>
          </li>
          <li>
            <Link to="/game_gpt">Guess a word (Round 2)</Link>
          </li>
          <li>
            <Link to="/game_bert">Guess a word (Round 3)</Link>
          </li>
        </ul>
        <Lottie options={defaultOptions} height={400} width={400} /> {/* Render the Lottie component */}
      </div>
    </div>
  );
}

export default ListofGames;
