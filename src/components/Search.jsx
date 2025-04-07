import React, { useState, useEffect, useRef } from 'react';
import './Search.css';



function RestaurantList({ restaurants }) {

    // {restaurants.features.map((res) => console.log(res.properties.name))}


    return <div className="col-4">
        <div className='restaurant-layout'>
            <div className="restaurant-list">
                {
                    Object.entries(restaurants).map((res) => {
                        return <div className="card mb-2">
                            <div className="card-body">
                                <h5 className="card-title">{res[1].properties.name}</h5>

                                <p className="card-text">{res[1].properties.address_line1 + res[1].properties.address_line2}</p>
                                <a href="#" className="card-link">{res[1].properties.website}</a>
                                {/* <a href="#" className="card-link">Latitude : {res[1].properties.lat}</a> */}
                            </div>
                        </div>
                    })
                }

            </div>
        </div>
    </div>
}

function TouristList({ tourists }) {

    // {restaurants.features.map((res) => console.log(res.properties.name))}


    return <div className="col-4">
        <div className='restaurant-layout'>
            <div className="restaurant-list">
                {
                    Object.entries(tourists).map((res) => {
                        return <div className="card mb-2">
                            <div className="card-body">
                                <h5 className="card-title">{res[1].properties.name}</h5>

                                <p className="card-text">{res[1].properties.address_line1 + res[1].properties.address_line2}</p>
                                <a href="#" className="card-link">{res[1].properties.website}</a>
                                {/* <a href="#" className="card-link">Latitude : {res[1].properties.lat}</a> */}
                            </div>
                        </div>
                    })
                }

            </div>
        </div>
    </div>
}

function SearchPlace() {
    const [show, setShow] = useState(false);

    const inputRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            setShow(true)
        }, 1000)
    }, [])

    return (
        <>
            <div className={`col-md-4 fade-in ${show && 'show'}`}>
                <div className="body">
                    <div className="box">
                        <h4 className='text-white text-center'>Welcome to the place to find best tourism place and restaurant</h4>
                        <div className="cardinput mb-3  text-center">

                            <img src='../assets/place.gif' className='mb-3' alt="" />
                            <label className="form-label d-block ">Enter City Name :</label>
                            <input type="text" className="form-control" placeholder="Enter City" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default function Search() {

    const [placeID, setPlaceID] = useState('')
    const [restaurants, setRestaurants] = useState({})
    const [tourists, setTourists] = useState([])

    useEffect(() => {
        findPlaceID("George Town")
    }, [])

    async function findPlaceID(place) {
        const url = `https://api.geoapify.com/v1/geocode/search?text=${place}&country=Malaysia&format=json&apiKey=${import.meta.env.VITE_API_KEY}`

        const response = await fetch(url);
        const data = await response.json();

        findPlaces(data.results[0].place_id)
    }

    async function findPlaces(placeid) {
        const url1 = `https://api.geoapify.com/v2/places?categories=catering.restaurant&filter=place:${placeid}&apiKey=${import.meta.env.VITE_API_KEY}`
        const url2 = `https://api.geoapify.com/v2/places?categories=tourism.attraction&filter=place:${placeid}&apiKey=${import.meta.env.VITE_API_KEY}`

        const response1 = await fetch(url1)
        const restaurantData = await response1.json()
        const response2 = await fetch(url2)
        const TouristData = await response2.json()

        setRestaurants(restaurantData.features)
        setTourists(TouristData.features);
        //    console.log(restaurants)
        //console.log(restaurants)
        // console.log(restaurantData.features[0].properties.name)
        // console.log(restaurantData)
        // typeof(restaurantData)
    }
   
    // useEffect(() => {
    //     console.log('Updated restaurants:', restaurants);
    // }, [restaurants]); 



    return <>
        <div className="container">
            <div className="row">
                {restaurants && <RestaurantList restaurants={restaurants} />}
                <SearchPlace />
                {tourists && <TouristList tourists={tourists} />}
            </div>
        </div>
    </>
}
