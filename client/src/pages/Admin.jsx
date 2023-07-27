import React, { useState, useEffect } from 'react';
import './admin.css';
import axios from 'axios';
import FilterDate from '../components/FilterDate';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { GiCancel } from "react-icons/gi";

// const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
// const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
// const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(customParseFormat);

export default function Admin() {
    const [check ,setcheck]=useState(true);
    const [buttonColor, setButtonColor] = useState("red");
    const [waste, setWaste] = useState([]);
    const [paginate, setPaginate] = useState(9);
    const [query, setQuery] = useState("");
    // I only create this state to have the initial state
    // of constant waste and use it in the date filter:
    const [allWaste, setAllWaste] = useState([]);

    useEffect(() => {
        const fetchWaste = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/waste'); 
                setWaste(res.data);
                setAllWaste(res.data);
            } catch (err) { }
        };
        fetchWaste();
    }, [check])


    const pagination = (e) => {
        setPaginate((prevValue) => prevValue + 9)
    };

    // Objects:
    const data = Object.values(waste);


    // I create an object with the Keys:
    const objectKeys = Object.keys(Object.assign({}, ...data));


    const Search = (waste) => {
        return waste.filter(item =>
            objectKeys.some(key => item[key].toString().toLowerCase().includes(query))
        );
    };

    // const filterDate = (createdAt, field) => {
    //     const filteredData = allWaste.filter((item) => {
    //         if (field === "from" && dayjs(item.createdAt).isSameOrAfter(dayjs(createdAt) )) {
    //             // console.log(dayjs(item.createdAt));
    //             // console.log(dayjs(createdAt));
    //             return item;
    //         }
    //     });
    //     setWaste(filteredData);
    // };

    const filterDate = (fromDate,toDate) => {
        console.log("from",fromDate);
        console.log("to",toDate);

        if(fromDate && toDate) {
            const filteredData = allWaste.filter((item) => {
                if (dayjs(item.createdAt).isSameOrAfter(dayjs(fromDate))
                      &&
                      dayjs(item.createdAt).isSameOrBefore(dayjs(toDate))
                    ) {
                    return item;
                }
            });
            setWaste(filteredData);
        }
        else {
            if(fromDate) {
                const filteredData = allWaste.filter((item) => {
                    if (dayjs(item.createdAt).isSameOrAfter(dayjs(fromDate) )) {
                        return item;
                    }
                });
                setWaste(filteredData);
            }
            else if(toDate) {
                const filteredData = allWaste.filter((item) => {
                    if (dayjs(item.createdAt).isSameOrBefore(dayjs(toDate) )) {
                        return item;
                    }
                });
                setWaste(filteredData);
            }
            else {
                setWaste(allWaste);
            }
        }
    };

    const handleDelete = async (id) => {

        try {
            console.log(id);
            const res = await axios.get(`http://localhost:4000/api/waste//find/${id}`); 
            if(res.data.status == 'Done') {
                const res = await axios.delete(`http://localhost:4000/api/waste/${id}`);
                setcheck(!check);
            }
            else {
                console.log("Cannot Delete As it is still pending");
            }
            
        } catch (err) {
            console.log(err);
        }
    };

    const handleClick = async (id,email,name,type,weight) => {
        try {
            console.log(id);
            const res = await axios.put(`http://localhost:4000/api/waste/${id}`,
            {color: 'green',status: 'Done'}, {new: true}
            );
            setcheck(!check);
            // send mail
            try {
                // passing info by query 
                // url is upto mail , from ? query started in key value form
                axios.post(`http://localhost:4000/api/waste/mail?key1=${email}&key2=${name}&key3=${type}&key4=${weight}`);
                console.log("Maailll seent");
                console.log("email :",email);
            } catch (err) {
                console.log(err);
            }

        } catch (err) {
            console.log(err);
        }
    }


    return (
        <>
            <div className='adminContainer'>
                <div className="filter">
                <h2>Filter: </h2></div>
                <div className="filterBox">
                <FilterDate
                    onDateFilter={filterDate}
               />
                </div>
                
                <div className='filterContainer'>
                    <h2>All Requests</h2>                    
                </div>
                  
                <div className='infoContainer'>

                    {Search(waste).slice(0, paginate).map((item,) => (
 
                        <div className='userContainer' 
                        key={item._id}
                        style={
                            {
                                borderStyle: 'solid',
                                borderWidth: '5px',
                                borderColor: `${item.color}`
                            }
                        }>
                           
                            <h4 className='name'>Name : {item.name}</h4>
                            <p className='contact'><b>Contact : </b>{item.contact}</p>
                            <p className='email'><b>Email : </b>{item.email}</p>
                            <p className='wasteType'><b>Waste Type : </b>{item.type}</p>
                            <p className='quantity'><b>Weight : </b>{item.quantity} kg</p>
                            <p className='time'><b>Date & Time : </b>{dayjs(item.createdAt).format("DD-MM-YYYY, HH:MM")}</p>
                            <p className='address'><b>Address : </b>{item.address}</p>
                            <div className="btns">
                            <button className="statusButton" 
                            onClick={()=> handleClick(item._id,item.email,item.name,item.type,item.quantity)} 
                            style={{backgroundColor: `${item.color}`}}>{item.status}</button>
                            <button className='deleteButton' 
                            onClick={() => handleDelete(item._id)}>Delete</button>
                            </div>
                            
                        </div>
                        
                    ))}
                </div>
                <button
                    className='moreBtn'
                    onClick={pagination}
                >
                    See more
                </button>
            </div >
        </>
    )
}
