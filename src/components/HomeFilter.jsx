import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, clearFilters } from "../features/filterSlice";
import Select from "react-select";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import "../styles/HomeFilter.css";

const HomeFilter = () => {
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const typingTimer = useRef(null);
  const navigate = useNavigate();

  const accommodationOptions = [
    { value: "Only room", label: "Only room" },
    { value: "Breakfast and dinner", label: "Breakfast and dinner" },
    { value: "Breakfast and dinner", label: "Breakfast and dinner" },
    { value: "All inclusive", label: "All inclusive" },
    {
      value: "Non-alcoholic all inclusive",
      label: "Non-alcoholic all inclusive",
    },
  ];

  const hotelType = [
    { value: "Resort", label: "Resort" },
    { value: "Hotel", label: "Hotel" },
    { value: "Apart", label: "Apart" },
    { value: "Hostel", label: "Hostel" },
    { value: "Luxury", label: "Luxury" },
  ];

  const amenitiesOptions = [
    { value: "wifi", label: "WiFi" },
    { value: "pool", label: "Pool" },
    { value: "parking", label: "Parking" },
    { value: "Spa-bath house", label: "Spa-bath house" },
    { value: "Beach", label: "Beach" },
    { value: "Child friendly", label: "Child friendly" },
    { value: "Animal friendly", label: "Animal friendly" },
    { value: "Safe", label: "Safe" },
    { value: "Gym", label: "Gym" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilters({ [name]: value }));

    if (name === "minPrice" || name === "maxPrice") {
      clearTimeout(typingTimer.current);
      typingTimer.current = setTimeout(() => {
        validatePriceRange();
      }, 2000);
    }

    if (name === "checkIn" || name === "checkOut") {
      validateDates(name, value);
    }
  };

  const validatePriceRange = () => {
    const { minPrice, maxPrice } = filters;

    if (minPrice && maxPrice) {
      if (parseFloat(minPrice) > parseFloat(maxPrice)) {
        setError(
          "Minimum price should be less than or equal to maximum price."
        );
        setIsModalOpen(true);
      } else {
        setError("");
        setIsModalOpen(false);
      }
    }
  };

  const validateDates = (name, value) => {
    const { checkIn, checkOut } = filters;
    const today = new Date();
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const newDate = new Date(value);

    if (name === "checkIn") {
      if (newDate < today.setHours(0, 0, 0, 0)) {
        setError("Check-in date cannot be in the past.");
        setIsModalOpen(true);
      } else if (checkOut && newDate > checkOutDate) {
        setError("Check-in date should be before check-out date.");
        setIsModalOpen(true);
      } else {
        setError("");
        setIsModalOpen(false);
      }
    }

    if (name === "checkOut") {
      if (newDate < today.setHours(0, 0, 0, 0)) {
        setError("Check-out date cannot be in the past.");
        setIsModalOpen(true);
      } else if (checkIn && newDate < checkInDate) {
        setError("Check-out date should be after check-in date.");
        setIsModalOpen(true);
      } else if (newDate.toDateString() === checkInDate.toDateString()) {
        setError("Check-in and check-out dates cannot be the same.");
        setIsModalOpen(true);
      } else {
        setError("");
        setIsModalOpen(false);
      }
    }
  };

  const handleSelectChange = (selectedOptions, action) => {
    dispatch(
      setFilters({
        [action.name]: selectedOptions
          ? selectedOptions.map((option) => option.value)
          : [],
      })
    );
  };

  const handleSubmit = () => {
    if (error) {
      setIsModalOpen(true);
      return;
    }

    const params = {
      destination: filters.destination,
      checkIn: filters.checkIn,
      checkOut: filters.checkOut,
      rooms: filters.rooms,
      adults: filters.adults,
      // minPrice: filters.minPrice,
      // maxPrice: filters.maxPrice,
      price:
        filters.minPrice && filters.maxPrice
          ? filters.minPrice + "-" + filters.maxPrice
          : "0-99999999",
      accomudationType: filters.accommodationType.join(","),
      roomAmenities: Array.isArray(filters.amenities)
        ? filters.amenities.join(",")
        : "",
    };
    // `hotelType` tanımlıysa `params` objesine ekleyin
    if (filters.hotelType && Array.isArray(filters.hotelType)) {
      params.hotelType = filters.hotelType.join(",");
    }
    const queryString = new URLSearchParams(params).toString();

    navigate(`/hotels?${queryString}`);
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    setError("");
    setIsModalOpen(false);
  };

  return (
    <div className="filter-container">
      <div className="filter-row">
        <input
          type="text"
          name="destination"
          className="filter-input"
          placeholder="Destination"
          value={filters.destination}
          onChange={handleChange}
        />
        <input
          type="date"
          name="checkIn"
          className="filter-input"
          value={filters.checkIn}
          onChange={handleChange}
        />
        <input
          type="date"
          name="checkOut"
          className="filter-input"
          value={filters.checkOut}
          onChange={handleChange}
        />
        <input
          type="number"
          name="rooms"
          className="filter-input"
          placeholder="Rooms"
          value={filters.rooms}
          onChange={handleChange}
        />
        <input
          type="number"
          name="adults"
          className="filter-input"
          placeholder="Adults"
          value={filters.adults}
          onChange={handleChange}
        />
      </div>
      <div className="filter-row">
        <input
          type="number"
          name="minPrice"
          className="filter-input"
          placeholder="Min. Price"
          value={filters.minPrice}
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxPrice"
          className="filter-input"
          placeholder="Max. Price"
          value={filters.maxPrice}
          onChange={handleChange}
        />
        <Select
          name="accommodationType"
          className="filter-multi-select"
          options={accommodationOptions}
          isMulti
          value={
            filters.accommodationType
              ? accommodationOptions.filter((option) =>
                  filters.accommodationType.includes(option.value)
                )
              : []
          }
          onChange={(selectedOptions) =>
            handleSelectChange(selectedOptions, { name: "accommodationType" })
          }
          placeholder="Accommodation Type"
        />
        <Select
          name="hotelType"
          className="filter-multi-select"
          options={hotelType}
          isMulti
          value={
            filters.hotelType
              ? hotelType.filter((option) =>
                  filters.hotelType.includes(option.value)
                )
              : []
          }
          onChange={(selectedOptions) =>
            handleSelectChange(selectedOptions, { name: "hotelType" })
          }
          placeholder="Hotel Type"
        />
        <Select
          name="amenities"
          className="filter-multi-select"
          options={amenitiesOptions}
          isMulti
          value={
            filters.amenities
              ? amenitiesOptions.filter((option) =>
                  filters.amenities.includes(option.value)
                )
              : []
          }
          onChange={(selectedOptions) =>
            handleSelectChange(selectedOptions, { name: "amenities" })
          }
          placeholder="Amenities"
        />
      </div>
      <div className="filter-buttons">
        <button
          className="filter-button filter-button-clear"
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>
        <button
          className="filter-button filter-button-search"
          onClick={handleSubmit}
        >
          SEARCH
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Error"
        className="price-error-modal"
      >
        <div className="modal-content">
          <p>{error}</p>
          <button onClick={() => setIsModalOpen(false)}>Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default HomeFilter;
