import React, { useState, useEffect } from 'react';
import { Input, Table, Button, message } from 'antd';
import GuessTable from '../assets/components/GuessTable';
import MuiTable from '../assets/components/MuiTable';
import InputForm from '../assets/components/InputForm';
import Lottie from 'react-lottie';
import animationData from '../assets/animations/lines.json';
import './Password.css';
import Header from '../assets/components/Header';
import { Link} from 'react-router-dom';
import { useLocation } from 'react-router-dom';



const Password = ({ gameEndpoint }) => {
    const [inputValue, setInputValue] = useState('');
    const [guesses, setGuesses] = useState([]);
    const [gameEnded, setGameEnded] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [attemptNumber, setAttemptNumber] = useState(0);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const handleSubmit = async () => {
        try {
            if (!gameEnded) {
                const similarity = await getCatVector();
                if (similarity === -1) {
                    setErrorMessage('Word not found in the dictionary. Please enter a new word.');
                    return;
                }

                const newGuess = {
                    id: guesses.length + 1,
                    guess: inputValue,
                    similarity: similarity,
                };

                setGuesses([...guesses, newGuess]);

                if (similarity === 1) {
                    setGameEnded(true);
                }

                setInputValue('');
                setErrorMessage('');
                setAttemptNumber(attemptNumber + 1);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            message.error('An error occurred. Please try again.');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    let getCatVector = async () => {
        try {
            let response = await fetch(`http://127.0.0.1:8080${gameEndpoint}${inputValue}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ inputValue, attemptNumber }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            let data = await response.json();

            if (data === null) {
                throw new Error('Word not found in the dictionary');
            }

            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const handleBackToList = () => {
        <Link to="/">Guess a word (Round 1)</Link>
    };
    

    const handleNextRound = () => {
        return <Link to="/game_bert"></Link>
        
    };

    
    
    return (
        <div className="password-container">
            <Header />
            {/* <div className="animation-container">
                <Lottie options={defaultOptions} height={400} width={400} />
            </div> */}
            <div className="content-container">
            <h1>{gameEnded ? 'Winner!' : 'Welcome to Round'}</h1>

                {!gameEnded && (
                    <InputForm
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        handleSubmit={handleSubmit}
                        errorMessage={errorMessage}
                        className="input-form"
                    />
                )}
                <GuessTable guesses={guesses} className="guess-table" />
                <div className="button-container">
                <Button type="primary">
                        <Link to="/">Back to Menu</Link>
                    </Button>
                    <Link to="/game_bert">
            <Button type="primary">
                Next Round
            </Button>
        </Link>
                </div>
            </div>
        </div>
    );
};

export default Password;
