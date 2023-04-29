import React, { useEffect, useState } from 'react'
import { upload } from "@spheron/browser-upload";
import { getDataVaultContract } from '../../helper/DataVaultSmartContract';
import { Contract } from 'ethers';
import { web3ConnectionAtom } from '../../atoms/web3Connection';
import { useAtom } from 'jotai';
import { Box, Button, LoadingOverlay, Modal, TextInput } from '@mantine/core';
import { IconDatabase } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { CredentialsUploadProcessModel } from './CredentialsUploadProcessModel';


export default function CredentialsUpload() {
    const [web3ConnectionData,] = useAtom(web3ConnectionAtom);
    const [uploadingCredential, setUploadingCredential] = useState<boolean>(false);
    const [opened, { open, close }] = useDisclosure(false);

    async function handleFormFile(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        const _website: string = e.target.website.value;
        const _usernameEmail: string = e.target.emailMore.value;
        const _password: string = e.target.password.value;

        console.log(_website, _usernameEmail, _password);
        if (_website && _usernameEmail && _password) {
            uploadCredentialsOnSmartContract(_website, _usernameEmail, _password);
        } 
    }


    async function uploadCredentialsOnSmartContract(website: string, usernameEmail: string, password: string) {
        setUploadingCredential(true);
        open()
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
        <>
            <Modal size="xl" ta="center" opened={opened} onClose={close} title="Uploading Process" centered>
                <CredentialsUploadProcessModel />
            </Modal>
            <h1>Upload Credentials</h1>

                <form onSubmit={handleFormFile} style={{ width: "22rem" }}>

                    <TextInput
                        withAsterisk
                        disabled={uploadingCredential} placeholder='website' id='website' name='website'
                        type='text'
                        label="Enter your website url"
                        required
                    />
                    <TextInput
                        withAsterisk
                        disabled={uploadingCredential} placeholder='email or username or phone' id='emailMore' name='emailMore'
                        type='text'
                        label="Enter your Email/Phone/Username"
                        required
                    />

                    <TextInput
                        withAsterisk
                        required
                        disabled={uploadingCredential} placeholder='password' id='password' name='password'
                        type='password'
                        label="Enter your password"
                    />

                    <Button fullWidth mt="lg" leftIcon={<IconDatabase />} disabled={!web3ConnectionData.connected} loading={uploadingCredential} type='submit' variant="outline" >
                        Upload Credentials
                    </Button>

                    {!web3ConnectionData.connected &&
                        <p>Please connect wallet first</p>
                    }
                </form>
        </>
    )
}
