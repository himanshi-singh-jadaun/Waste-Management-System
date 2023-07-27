import React, { useRef, useState } from 'react';

export default function FilterDate({ onDateFilter }) {
    // const [filter, setFilter] = useState({
    //     from: "",
    //     to: ""
    // });

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");





    const fromRef = useRef();
    const toRef = useRef();

    // const fromDate = fromRef.current.value;
    // const toDate = toRef.current.value;

    // onDateFilter(fromDate,toDate);



    const handleInput = (field) => (e) => {
        const { value } = e.target;

        // setFilter({
        //     ...filter,
        //     [field]: value
        // });

        // console.log(field,value);
        // console.log("field",field);

        if(field=="from") {
            setFromDate(value);
        }
        if(field=="to") {
            setToDate(value);
        }
        // console.log("from",fromDate);
        // console.log("to",toDate);
        onDateFilter(fromRef.current.value,toRef.current.value);
        
        // console.log("from filter",filter.from);
        // console.log("to filter",filter.to);


        // switch (field) {
        //     case "from":
        //         onDateFilter(value, "from");
        //         break;
        //     case "to":
        //         onDateFilter(value, "to");
        //         break;
        //     default:
        //         break;
        // }
    };

    // console.log(onDateFilter);

    return (
        <div>
            <div>
                <label htmlFor="startDate">From</label>
                <input type="date" className='inputDate' ref={fromRef} onChange={handleInput("from")} />
            </div>
            <div>
                <label htmlFor="endDate">To</label>
                <input type="date" className='inputDate' ref={toRef} onChange={handleInput("to")} />
            </div>
        </div>
    )
}
