import React, { useState } from 'react';
import Display from './display';

const Input = ({ changeHandler, value }) => {


    const helper = (e) => changeHandler(e.target.value)
    return <div>
        <input
            type="text"
            value={value}
            onChange={helper}
        />
    </div>


}


export default Input                        
