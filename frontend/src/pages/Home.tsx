import React, { useEffect, useState } from 'react'
import { upload } from "@spheron/browser-upload";
import FileUpload from '../components/FileUpload';
import ConnectWallet from '../components/ConnectWallet';
import CredentialsUpload from '../components/CredentialsUpload';
import AllFiles from '../components/AllFiles';
import AllCredentials from '../components/AllCredentials';



export default function Home() {


    return (
        <div>
            <ConnectWallet />
            <FileUpload />
            <AllFiles />
            <CredentialsUpload />
            <AllCredentials />
        </div>
    )
}
