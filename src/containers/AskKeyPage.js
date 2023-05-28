import '../App.css';
import React, { useState } from "react";

import { validateApiKey } from '../functions/Utils';

const AskKeyPage = ({setApiKey}) => {
    const [error, setError] = useState(false);
    const [apiKey, setApiKeyValue] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === "Enter"){
            event.preventDefault();
            handleValidation();
        }
    }

    const handleClick = () => {
        handleValidation();
    }

    const handleValidation = async () => {
        try{
            const test = await validateApiKey(apiKey);
            if (test === true) {
                setApiKey(apiKey);
                setError(false);
            } else {
                setError(true);
            }
        }
        catch (error){
            setError(true);
            console.log(error);
        }
    }

    return (
        <div className="App ask-key-container" >
            <h2>Medical Consultation System</h2>
            <span>
                Api Key : <input type="text" value={apiKey} onChange={(e) => setApiKeyValue(e.target.value)} onKeyDown={handleKeyDown}/>
            </span>
            <button onClick={handleClick}>Submit</button>
            {error && (
                <div className="error">
                    <h3 style={{color: "red"}}>Error!</h3>
                    <p style={{color: "red"}}>Please ensure that a correct api key is provided</p>
                </div> 
            )}
        </div>
    );
}

export default AskKeyPage;
/*
1. Instead of using a try-catch block, consider using Promise.catch() to handle errors. This can make your code more concise and easier to read.
2. Instead of using ref to handle errors, it's better to use useState to change the error message dynamically. This makes your code more declarative and easier to manage.
3. Use event.preventDefault() in the handleKeyDown function to prevent the default behavior of the enter key.
*/