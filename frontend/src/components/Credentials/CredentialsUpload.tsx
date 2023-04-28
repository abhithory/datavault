import React, { useEffect, useState } from 'react'
import { upload } from "@spheron/browser-upload";
import { getDataVaultContract } from '../../helper/DataVaultSmartContract';
import { Contract } from 'ethers';
import { web3ConnectionAtom } from '../../atoms/web3Connection';
import { useAtom } from 'jotai';
import { Button, TextInput } from '@mantine/core';


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
            const _addCredentialOfUser = await dataVault.addCredentialOfUser({ website, usernameOrEmailOrPhone: usernameEmail, password });
            console.log("1");
            const addedfile = await _addCredentialOfUser.wait()
            console.log(addedfile);
        } catch (error: any) {
            console.log(error);
            console.log(error?.message);
        } finally {
            setUploadingCredential(false)
        }
    }


    return (
        <div>
            <h1>Upload file</h1>
            <form onSubmit={handleFormFile}>

                <TextInput
                    disabled={uploadingCredential} placeholder='website' id='website' name='website'
                    type='text'
                    label="Enter your website url"
                />
                <TextInput
                    disabled={uploadingCredential} placeholder='email or username or phone' id='emailMore' name='emailMore'
                    type='text'
                    label="Enter your website Email/Phone/Username"
                />

                <TextInput
                    disabled={uploadingCredential} placeholder='password' id='website' name='website'
                    type='password'
                    label="Enter your password"
                />

                <Button disabled={uploadingCredential || !web3ConnectionData.connected} type='submit' variant="outline" >
                    Upload Credentials
                </Button>

                {!web3ConnectionData.connected &&
                    <p>Please connect wallet first</p>
                }
            </form>
        </div>
    )
}
