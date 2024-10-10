import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../features/filterSlice";
import axios from "axios";
import HomeFilter from "../components/HomeFilter";
import "../styles/HotelList.css";

const HotelsList = () => {
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const [hotels, setHotels] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const parsedFilters = {};
    searchParams.forEach((value, key) => {
      if (
        key === "amenities" ||
        key === "accommodationType" ||
        key === "propertyType"
      ) {
        parsedFilters[key] = value ? value.split(",") : [];
      } else {
        parsedFilters[key] = value;
      }
    });
    dispatch(setFilters(parsedFilters));

    const fetchHotels = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/hotel${location.search}`
        );
        setHotels(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, [location.search, dispatch]);

  const navigate = useNavigate(); // useNavigate hook kullanarak navigate fonksiyonunu alın

  const handleHotelClick = (id) => {
    console.log(id)
    navigate(`/hotel/${id}`);
  };

  return (
    <div>
      <HomeFilter
        filters={filters}
        setFilters={(newFilters) => dispatch(setFilters(newFilters))}
      />
      <div className="hotel-list">
        {hotels.map((hotel, index) => (
          <div
            className="hotel-card"
            key={index}
            onClick={() => handleHotelClick(hotel.hotel_id)}
          >
            <div className="hotel-image">
              <img src={hotel.image} alt={`${hotel.name} Image`} />
            </div>
            <div className="hotel-info">
              <h2>{hotel.name}</h2>
              <p>{hotel.location}</p>
              <p>Informations about the hotel</p>
              <p>- Accommodation Type: {hotel.accommodationType}</p>
              <p>- Hotel Type: {hotel.propertyType}</p>
              <p>
                - Facilities:{" "}
                {hotel.facilities ? hotel.facilities.join(", ") : " "}
              </p>
              <div className="hotel-rating">
                <span>Rating: {hotel.rating}</span>
              </div>
              <div className="hotel-reservation">
                <p>{hotel.nights} nights</p>
                <p>{hotel.price} $</p>
                <button>Make Reservation</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelsList;
