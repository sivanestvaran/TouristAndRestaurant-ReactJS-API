import React, { useState } from 'react';
import RestaurantList from './RestaurantList';
import TouristList from './TouristList';
import SearchPlace from './SearchPlace';
import './Search.css'

export default function Main() {
    const [restaurants, setRestaurants] = useState([]);
    const [tourists, setTourists] = useState([]);

    const findPlaceID = async (place) => {
        const url = `https://api.geoapify.com/v1/geocode/search?text=${place}&country=Malaysia&format=json&apiKey=${import.meta.env.VITE_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.results.length > 0) {
            findPlaces(data.results[0].place_id);
        }
    };

    const findPlaces = async (placeid) => {
        const url1 = `https://api.geoapify.com/v2/places?categories=catering.restaurant&filter=place:${placeid}&apiKey=${import.meta.env.VITE_API_KEY}`;
        const url2 = `https://api.geoapify.com/v2/places?categories=tourism.attraction&filter=place:${placeid}&apiKey=${import.meta.env.VITE_API_KEY}`;

        const res1 = await fetch(url1);
        const restaurantData = await res1.json();

        const res2 = await fetch(url2);
        const touristData = await res2.json();

        setRestaurants(restaurantData.features);
        setTourists(touristData.features);
    };

    return (
        <div className="container">
            <div className="row">
                <SearchPlace onSearch={findPlaceID} />
                {restaurants.length > 0 && <RestaurantList restaurants={restaurants} />}
                {tourists.length > 0 && <TouristList tourists={tourists} />}
            </div>
        </div>
    );
}
