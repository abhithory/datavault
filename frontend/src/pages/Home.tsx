import React, { useEffect, useState } from 'react'
import { upload } from "@spheron/browser-upload";
import FileUpload from '../components/FileUpload';
import ConnectWallet from '../components/ConnectWallet';



export default function Home() {


    return (
        <div>
            <ConnectWallet />
            <FileUpload />
        </div>
    )
}
