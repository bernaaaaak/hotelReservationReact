//filter reducer

import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
    name: 'filters',
    initialState: {
        destination: '',
        checkIn: '',
        checkOut: '',
        rooms: '',
        adults: '',
        minPrice: '',
        maxPrice: '',
        accommodationType: [],
        propertyType: [],
        amenities: []
    },
    reducers: {
        setFilters: (state, action) => {
            return { ...state, ...action.payload };
        },
        clearFilters: () => {
            return {
                destination: '',
                checkIn: '',
                checkOut: '',
                rooms: '',
                adults: '',
                minPrice: '',
                maxPrice: '',
                accommodationType: [],
                propertyType: [],
                amenities: []
            };
        },
    },
});

export const { setFilters, clearFilters } = filterSlice.actions;

export default filterSlice.reducer;