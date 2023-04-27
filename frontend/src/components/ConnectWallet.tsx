import React, { useEffect, useState } from 'react'
import {Contract, ethers} from "ethers";
import { getDataVaultContract, getWeb3Provider } from '../helper/DataVaultSmartContract';
import { Web3Provider } from '@ethersproject/providers';
import { useAtom } from "jotai";
import { web3ConnectionAtom, web3ConnectionInterface } from '../atoms/web3Connection';


export default function ConnectWallet() {
    const [web3ConnectionData,setWeb3ConnectionData] = useAtom(web3ConnectionAtom);
    const [error, setError] = useState<string>("");


    async function connectToWallet() {
        if (window.ethereum) {
            const provider:Web3Provider = getWeb3Provider();
            // @ts-ignore: Unreachable code error
            const accounts = await provider.send("eth_requestAccounts", []);
            setWeb3ConnectionData({connected:true,walletAddress:accounts[0]});

            // console.log(accounts);
            // const { name, chainId } = await provider.getNetwork();
            // console.log(name, chainId);
            
        } else {
            setError("Please install metamask wallet")
        }
    }

   

    return (
        <div>
            <button onClick={connectToWallet}>Connect wallet</button>
            {web3ConnectionData.connected &&
            <p>address: {web3ConnectionData.walletAddress}</p>
            }
            {error !== "" &&
            <p>error: {error}</p>
            }
        </div>
    )
}
