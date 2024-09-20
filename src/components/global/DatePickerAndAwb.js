"use client"

import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReadyToShipButton from '../adminComp/ReadyToShipButton';
import refund from '@/app/actions/refund';

const DatePickerAndAwb = ({orderId}) => {
    const [isMounted, setIsMounted] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [time, setTime] = useState('1600');
    const [isloading,setIsloading] =useState(false)

    useEffect(() => {
        setIsMounted(true)

    }, [])
    if (!isMounted) {
        return null

    }

    // Convert date to epoch time
    const getEpochTime = (date) => Math.floor(date.getTime());

    // Convert time to "1600" format
    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        return `${hours}${minutes}`;
    };

    // Handle time change
    const handleTimeChange = (e) => {
        setTime(formatTime(e.target.value));
    };

    // Handle date change
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const onk = ()=>{
        refund(orderId)
    }

    return (
        <div>
            <Form>
                {/* Date Picker */}
                <Form.Group>
                    <Form.Label>Select Date</Form.Label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        className="form-control"
                    />
                </Form.Group>

                {/* Time Picker */}
                <Form.Group>
                    <Form.Label>Select Time</Form.Label>
                    <Form.Control
                        type="time"
                        value={time.slice(0, 2) + ':' + time.slice(2)} // Convert "1600" to "16:00" for input
                        onChange={handleTimeChange}
                    />
                </Form.Group>


            </Form>
            
            <ReadyToShipButton orderId={orderId} pickupTime={time} pickupdate={getEpochTime(selectedDate)} setIsloading={setIsloading} isloading={isloading} >
                Schedule Pickup
            </ReadyToShipButton>
            {/* <button onClick={onk}>
                hree
            </button> */}

            {/* Display output */}
            <p>Selected Date (Epoch): {getEpochTime(selectedDate)}</p>
            <p>Selected Time (1600 format): {time}</p>
        </div>
    );
};

export default DatePickerAndAwb;
