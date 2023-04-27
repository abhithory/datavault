import React from 'react'
import { Link, Outlet } from 'react-router-dom'

import "./navigation.css"
import ConnectWallet from '../ConnectWallet'

export default function Navigation() {
    return (
        <nav>
            <ConnectWallet />
            <div>
                <Link to="/">
                    <button>Files</button>
                </Link>
                <Link to="/credentials">
                    <button>Credentials</button>
                </Link>
            </div>
        </nav>
    )
}
