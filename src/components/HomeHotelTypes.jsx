import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomeHotelType.css';
import holidayImage from '../assets/images/holiday.jpg';
import holidayImage2 from '../assets/images/holiday2.png';
import holidayImage3 from '../assets/images/holiday3.png';
import holidayImage4 from '../assets/images/holiday4.png';




//Statik olcak

const hotels = [
  { id: 1, name: 'Honeymoon Hotels', image: holidayImage },
  { id: 2, name: 'Discounted Hotels', image: holidayImage2 },
  { id: 3, name: 'Popular Hotels', image: holidayImage3 },
  { id: 4, name: 'Hotels in Antalya', image: holidayImage4 }
];



const HomeHotelTypes = () => {
  const navigate = useNavigate();

  const handleCardClick = (name) => {
    navigate(`/hotels?filter=${name}`);
  };

  return (
    <div className="hotel-card-container">
      {hotels.map((hotel) => (
        <div
          key={hotel.id}
          className="hotel-card"
          style={{ backgroundImage: `url(${hotel.image})` }}
        >
          <div
            className="hotel-card-overlay"
            onClick={() => handleCardClick(hotel.name)}
          >
            <span className="hotel-card-text">{hotel.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeHotelTypes;