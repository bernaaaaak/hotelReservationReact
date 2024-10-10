import React from 'react'
import HomeCard from '../components/HomeCard'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import FeatureBox from '../components/FeatureBox'
import { useAuth } from '../service/AuthContext';
import UserNavBar from '../components/UserNavbar'
import { Navbar } from 'react-bootstrap'


function Home() {
    const { user, isAdmin } = useAuth();

    return (
        <div>
            {user ? <UserNavBar /> : <NavBar />}
            <HomeCard />
            <FeatureBox />
            <Footer />
        </div>
    )
}

export default Home