import React, { useState } from 'react';
import './input.css';

export default function Inputs(props) {
    const { label, type, placeholder, onChange, errorMsg, ...others } = props;
    const [focus, setFocus] = useState(false);

    const handleFocus = () => {
        setFocus(true)
    };

    return (
        <div>
            <label>{label}</label>
            <input
                {...others}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={handleFocus}
                focus={focus.toString()}
            />
            <span className='error'>{focus ? errorMsg : ""}</span>
        </div>
    )
}
