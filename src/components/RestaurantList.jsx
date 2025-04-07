// Example for RestaurantList.jsx
export default function RestaurantList({ restaurants }) {
    return (
        <div className="col-4">

            <div className="restaurant-layout">
                <h3 className="text-white mt-3">Restaurant</h3>
                <div className="restaurant-list">
                    {restaurants.map((res) => (
                        <div key={res.properties.place_id} className="card mb-2">
                            <div className="card-body">
                                <h5 className="card-title">{res.properties.name}</h5>
                                <p className="card-text">{res.properties.address_line1 + ' ' + res.properties.address_line2}</p>
                                <a href="#" className="card-link">{res.properties.website}</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
