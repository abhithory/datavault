import React from 'react'
import { Link, Outlet } from 'react-router-dom'

import "./navigation.css"
import ConnectWallet from '../ConnectWallet'

export default function Navigation() {
    return (
        <nav>
            <div className="navContent">
            <h1>DataVault</h1>
            <ConnectWallet />
            </div>
        </nav>
    )
}