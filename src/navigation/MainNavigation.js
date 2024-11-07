import React from 'react'
import { Link, BrowserRouter as Router } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AppNavigation from './AppNavigation'
import AuthNavigation from './AuthNavigation'

const MainNavigation = () => {
    const { isSignedIn } = useAuth()
    return (
        <Router>
            <div className="App">
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/users">Users</Link>
                </nav>
                {
                    isSignedIn ? (
                        <AppNavigation />
                    ) : (
                        <AuthNavigation />
                    )
                }

            </div>
        </Router>
    )
}

export default MainNavigation
