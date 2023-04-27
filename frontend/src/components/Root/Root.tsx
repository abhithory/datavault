import React from 'react'
import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import "./root.css";

export default function Root() {
    return (
        <div className='rootContainer'>
            <div className="navigationContainer">
                <Navigation />
            </div>
            <div className='contentContainer'>
                <Outlet />
            </div>
        </div>
    )
}
