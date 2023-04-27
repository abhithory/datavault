import React from 'react'
import ConnectWallet from './ConnectWallet'
import { Link, Outlet } from 'react-router-dom'

export default function Navigation() {
  return (
    <div>

        <Link to="/credentials">
        <button>Credentials</button>
        </Link>
        <Link to="/">
        <button>Files</button>
        </Link>

        <ConnectWallet />

        <Outlet />

    </div>
  )
}
