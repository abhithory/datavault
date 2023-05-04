import React, { useEffect, useState } from 'react'
import {Contract, ethers} from "ethers";
import { getDataVaultContract, getWeb3Provider } from '../helper/DataVaultSmartContract';
import { Web3Provider } from '@ethersproject/providers';
import { useAtom } from "jotai";
import { web3ConnectionAtom, web3ConnectionInterface } from '../atoms/web3Connection';
import { Button } from '@mantine/core';


export default function ConnectWallet() {
    const [web3ConnectionData,setWeb3ConnectionData] = useAtom(web3ConnectionAtom);
    const [error, setError] = useState<string>("");


    async function connectToWallet() {
        if (window.ethereum) {
            const provider:Web3Provider = getWeb3Provider();
            const accounts = await provider.send("eth_requestAccounts", []);

            console.log('====================================');
            console.log("balance: ", await provider.getBalance(accounts[0]));
            console.log('====================================');
            setWeb3ConnectionData({...web3ConnectionData,connected:true,walletAddress:accounts[0]});
            // console.log(accounts);
            // const { name, chainId } = await provider.getNetwork();
            // console.log(name, chainId);
            
        } else {
            setError("Please install metamask wallet")
        }
    }

    async function isConnected() {
          const provider:Web3Provider = getWeb3Provider();
          const addresses = await provider.listAccounts(); 
          return addresses.length > 0
     }

     useEffect(()=>{
        (async function(){
            const _isconnected = await isConnected();

            if (_isconnected) {
                connectToWallet()
            }
        })()
     },[])
   

    return (
        <div>
            <Button color="customWhite" className='textPrimary' onClick={connectToWallet}>{web3ConnectionData.connected ? "Connected" :  "Connect wallet"}</Button>
            
        
            {error !== "" &&
            <p>error: {error}</p>
            }
        </div>
    )
}
