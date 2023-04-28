import React, { useEffect, useState } from 'react'
import { upload } from "@spheron/browser-upload";
import { getDataVaultContract } from '../../helper/DataVaultSmartContract';
import { Contract } from 'ethers';
import { web3ConnectionAtom } from '../../atoms/web3Connection';
import { useAtom } from 'jotai';


export default function CredentialsUpload() {


    const [web3ConnectionData,] = useAtom(web3ConnectionAtom);

    const [uploadingCredential, setUploadingCredential] = useState<boolean>(false);
    


    async function handleFormFile(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        const _website: string = e.target.website.value;
        const _usernameEmail: string = e.target.emailMore.value;
        const _password: string = e.target.password.value;

        console.log();
        

        console.log(_website, _usernameEmail, _password);
        
        if (_website && _usernameEmail && _password) {
            uploadCredentialsOnSmartContract(_website, _usernameEmail, _password);
        }
    }


    async function uploadCredentialsOnSmartContract(website: string, usernameEmail: string, password: string) {
        setUploadingCredential(true)
        try {
            const dataVault: Contract = getDataVaultContract();
            console.log("uploading credentials on smart contract");
            const _addCredentialOfUser = await dataVault.addCredentialOfUser({ website, usernameOrEmailOrPhone:usernameEmail, password });
            console.log("1");
            const addedfile = await _addCredentialOfUser.wait()
            console.log(addedfile);
        } catch (error: any) {
            console.log(error);
            console.log(error?.message);
        } finally{
            setUploadingCredential(false)
        }
    }


    return (
        <div>
            <h1>Upload file</h1>
                <form onSubmit={handleFormFile}>
                    <input disabled={uploadingCredential} type="text" placeholder='website' id='website' name='website' />                    
                    <br />
                    <input disabled={uploadingCredential} type="text" placeholder='email or username or phone' id='emailMore' name='emailMore' />                    
                    <br />
                    <input disabled={uploadingCredential} type="password" placeholder='password' id='password' name='password' />                    
                    <br />
                    <button disabled={uploadingCredential || !web3ConnectionData.connected} type='submit'>Upload credentials</button>
                    {!web3ConnectionData.connected &&
                    <p>Please connect wallet first</p>
                    }
                </form>
        </div>
    )
}
