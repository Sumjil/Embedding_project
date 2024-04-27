// InputForm.js
import React from 'react';
import { Input, Button } from 'antd';

const InputForm = ({ inputValue, setInputValue, handleSubmit, gameEnded, errorMessage }) => {
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div style={{ marginBottom: '20px' }}>
            <Input
                type="text"
                placeholder="Enter your word"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onPressEnter={handleKeyPress}
                style={{ width: '200px', marginRight: '10px' }} // Добавляем отступ справа
                disabled={gameEnded} // Disable input if the game has ended
            />
            <Button type="primary" onClick={handleSubmit} disabled={gameEnded}>
                Submit
            </Button>
            {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>} {/* Добавляем отступ сверху */}
        </div>
    );
    
};

export default InputForm;
