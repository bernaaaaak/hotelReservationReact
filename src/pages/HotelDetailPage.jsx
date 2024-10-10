import React from 'react'
import HotelDetail from '../components/HotelDetail'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { useAuth } from '../service/AuthContext';
import UserNavBar from '../components/UserNavbar'

function HotelDetailPage() {
    const { user, isAdmin } = useAuth();
    return (
        <div>
            {user ? <UserNavBar /> : <NavBar />}
            <HotelDetail />
            <Footer />
        </div>
    )
}

export default HotelDetailPage