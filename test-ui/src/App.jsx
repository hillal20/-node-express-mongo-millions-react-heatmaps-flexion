
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Input from './input';
import Display from './display';

function App() {
    const [inputData, setInputData] = useState("")
    const changeHandler = (e) => {
        setInputData(e)
    }
    return (
        <div className="App">
            <h1>Hello word </h1>
            <Display data={inputData} />
            <Input changeHandler={changeHandler} value={inputData} />
        </div>
    );
}
export default App;



