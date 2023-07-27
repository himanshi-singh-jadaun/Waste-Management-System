import React, { useState } from 'react';
import './complain.css';
import Inputs from '../components/Inputs';
import { inputsA, inputsB, options } from '../data';
import axios from 'axios';

export default function Complain() {
    const [selected, setSelected] = useState(options[0].value);
    const [disable, setDisable] = useState(false);
    const [values, setValues] = useState({
        name: "",
        // file: "",
        contact: "",
        email: "",
        quantity: "",
        address: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postWaste = {
            name: values.name,
            // file: values.file,
            contact: values.contact,
            email: values.email,
            type: selected,
            quantity: values.quantity,
            address: values.address
        };

        try {
            console.log("Hi");
            await axios.post('http://localhost:4000/api/waste', postWaste);
            window.location.reload();
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSelect = (e) => {
        setSelected(e.target.value)
    };

    return (
            <div className='complainContainer'>
                <div className="complainBox">
                <form>
                {/* <form action="" onSubmit={handleSubmit}> */}
                    <h2>Fill it</h2>
                    {inputsA.map((item) => (
                        <Inputs
                            key={item.id}
                            {...item}
                            value={values[item.name]}
                            onChange={handleChange}
                        />
                    ))}
                    {/*Fin Input 1*/}
                    <label>Waste Type:</label>
                    <select
                        id="waste"
                        value={selected}
                        onChange={handleSelect}
                    >
                        <optgroup label='type'>
                            {options.map((option) => (
                                <option
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </option>
                            ))}
                        </optgroup>
                    </select>
                    {inputsB.map((item) => (
                        <Inputs
                            key={item.id}
                            {...item}
                            value={values[item.name]}
                            onChange={handleChange}
                        />
                    ))}
                    <button
                        className='mainBtn'
                        type='submit'
                        onClick={handleSubmit}
                    >
                      Send
                    </button>
                </form>
                </div>
            </div>
    )
}

