import React from 'react'
import { Outlet } from 'react-router-dom';
import NavBar from '../Navigation/NavBar';
import "./root.css";
import TabNavigation from '../Navigation/TabNavigation';

export default function Root() {
    return (
        <div className='rootContainer'>
            <div className="navigationContainer">
                <NavBar />
            </div>
            <div className="">
                <TabNavigation/>
            </div>
            <div className='contentContainer'>
                <Outlet />
            </div>
        </div>
    )
}
