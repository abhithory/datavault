import { Tabs } from '@mantine/core';
import React from 'react'
import { Link } from 'react-router-dom';

export default function TabNavigation() {
    return (
        <Tabs defaultValue="Files"  >
            <Tabs.List style={{"alignItems":"center","justifyContent":"center"}}>
                    <Link  to="/" >
                        <Tabs.Tab  value="Files">Files</Tabs.Tab>
                    </Link>
                    <Link to="/credentials">
                        <Tabs.Tab value="Credentials">Credentials</Tabs.Tab>
                    </Link>
                {/* <Tabs.Tab value="settings">Settings</Tabs.Tab>

                <Tabs.Tab value="account" ml="auto">
                    Account
                </Tabs.Tab> */}
            </Tabs.List>
        </Tabs>
    )
}

