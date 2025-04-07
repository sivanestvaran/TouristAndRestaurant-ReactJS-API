import React, { useRef, useEffect, useState } from 'react';

export default function SearchPlace({ onSearch }) {
    const [show, setShow] = useState(false);
    const inputRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            setShow(true);
        }, 1000);
    }, []);

    const handleSearch = () => {
        const city = inputRef.current.value;
        if (city.trim()) {
            onSearch(city);
        }
    };

    return (
        <div className={`col-md-4 fade-in ${show && 'show'}`}>
            <div className="body">
                <div className="box">
                    <h4 className='text-white text-center'>
                        Welcome to the place to find best tourism places and restaurants
                    </h4>
                    <div className="cardinput mb-3 text-center">
                        <img src='../assets/place.gif' className='mb-3' alt="search" />
                        <label className="form-label d-block">Enter City Name :</label>
                        <input type="text" ref={inputRef} className="form-control" placeholder="Enter City" />
                        <button className='btn btn-info mt-2' onClick={handleSearch}>Search</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
