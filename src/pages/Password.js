import React, { useState, useEffect } from 'react';
import { Input, Table, Button, message } from 'antd';
import GuessTable from '../assets/components/GuessTable';
import MuiTable from '../assets/components/MuiTable';
import InputForm from '../assets/components/InputForm';
// import LottieAnimation from '../assets/LottieAnimation';
import './Password.css'; // Import CSS file for styles


const Password = ({gameEndpoint}) => {
    const [inputValue, setInputValue] = useState('');
    const [guesses, setGuesses] = useState([]);
    const [gameEnded, setGameEnded] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [attemptNumber, setAttemptNumber] = useState(0); // Номер попытки


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
                body: JSON.stringify({inputValue, attemptNumber}),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            let data = await response.json();

            if (data === null) {
                throw new Error('Word not found in the dictionary');
            }
            console.log(data);

            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };


    return (
        <div className="password-container">
          <h1>{gameEnded ? 'Winner!' : 'Welcome to the first game'}</h1>
          {/* <LottieAnimation /> Добавляем анимацию */}
          {!gameEnded && (
            <InputForm
              inputValue={inputValue}
              setInputValue={setInputValue}
              handleSubmit={handleSubmit}
              errorMessage={errorMessage}
              className="input-form" // Добавляем класс для поля ввода
            />
          )}
          <GuessTable guesses={guesses} className="guess-table" /> {/* Добавляем класс для таблицы */}
        </div>
      );

//     return (
    
//         <div className="password-container">
//     <h1>{gameEnded ? 'Winner!' : 'Welcome to the first game'}</h1>
//      {/* Add Lottie animation */}
    
//     {!gameEnded && (
//         <InputForm
//             inputValue={inputValue}
//             setInputValue={setInputValue}
//             handleSubmit={handleSubmit}
//             errorMessage={errorMessage}
//             className="input-form" // Добавьте класс для поля ввода
//         />
//     )}
//     <GuessTable guesses={guesses} className="guess-table" /> {/* Добавьте класс для таблицы */}
//     {/* <MuiTable guesses={guesses} ></MuiTable> */}
// </div>

//     );
};

export default Password;


// const Password = () => {
//     const [inputValue, setInputValue] = useState('');
//     const [guesses, setGuesses] = useState([]);
//     const [gameEnded, setGameEnded] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('');

//     const handleSubmit = async () => {
//         try {
//             if (!gameEnded) {
//                 const similarity = await getCatVector();

//                 if (similarity === -1) {
//                     setErrorMessage('Word not found in the dictionary. Please enter a new word.');
//                     return; // Exit the function early if there's an error
//                 }

//                 const newGuess = {
//                     id: guesses.length + 1,
//                     guess: inputValue,
//                     similarity: similarity,
//                 };

//                 // Add the new guess to the existing guesses array
//                 setGuesses([...guesses, newGuess]);

//                 // Check if similarity is 1 to end the game
//                 if (similarity === 1) {
//                     setGameEnded(true);
//                 }

//                 // Clear the input value after submission
//                 setInputValue('');
//                 setErrorMessage(''); // Clear the error message
//             }
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             message.error('An error occurred. Please try again.'); // Show a generic error message
//         }
//     };

//     const handleKeyPress = (event) => {
//         if (event.key === 'Enter') {
//             // Call handleSubmit function when Enter key is pressed
//             handleSubmit();
//         }
//     };

//     let getCatVector = async () => {
//         try {
//             let response = await fetch(`http://127.0.0.1:8080/game/${inputValue}/`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(inputValue),
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }

//             let data = await response.json();

//             if (data === null) {
//                 throw new Error('Word not found in the dictionary');
//             }

//             // Return the similarity value or any other data you want
//             return data; // Update this based on your actual response structure
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             throw error; // Rethrow the error to be caught in the calling function
//         }
//     };

//     const columns = [
//         {
//             title: '#',
//             dataIndex: 'id',
//             key: 'id',
//         },
//         {
//             title: 'Guess',
//             dataIndex: 'guess',
//             key: 'guess',
//         },
//         {
//             title: 'Similarity',
//             dataIndex: 'similarity',
//             key: 'similarity',
//             sorter: (a, b) => a.similarity - b.similarity, // Specify custom sorter function
//             sortOrder: 'descend', // Initial sorting order set to descend
//         },
//     ];

//     return (
//         <div style={{ width: '600px', margin: '0 auto' }}>
//             <h1>{gameEnded ? 'Winner!' : 'Welcome to the first game'}</h1>
//             {!gameEnded && (
//                 <>
//                     <Input
//                         type="text"
//                         placeholder="Enter your word"
//                         value={inputValue}
//                         onChange={(event) => setInputValue(event.target.value)}
//                         onPressEnter={handleKeyPress} // Call handleKeyPress when Enter key is pressed
//                         style={{ width: '200px' }}
//                     />
//                     <Button type="primary" onClick={handleSubmit}>
//                         Submit
//                     </Button>
//                     {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//                 </>
//             )}

//             <Table dataSource={guesses} columns={columns} rowKey="id" />
//         </div>
//     );
// };

// export default Password;
