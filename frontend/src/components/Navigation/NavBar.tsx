import React from 'react'
import { Link, Outlet } from 'react-router-dom'

import "./navigation.css"
import ConnectWallet from '../ConnectWallet'

import logo from "../../media/logoTransparent.png"

export default function Navigation() {

    return (
        <nav>
            <div className="navContent" >
            <img src={logo} width={100} />
            <ConnectWallet />
            </div>
        </nav>
    )
}
