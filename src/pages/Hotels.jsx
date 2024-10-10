import React from 'react'
import NavBar from '../components/NavBar'
import HomeFilter from '../components/HomeFilter'
import Footer from '../components/Footer'
import HotelList from '../components/HotelList'
import UserNavBar from '../components/UserNavbar'
import { useAuth } from '../service/AuthContext';

function Hotels() {
    const { user, isAdmin } = useAuth();
    return (
        <div>
            {user ? <UserNavBar /> : <NavBar />}
            <HotelList />
            <Footer />
        </div>
    )
}

export default Hotels