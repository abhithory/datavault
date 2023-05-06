import React, { useEffect, useState } from 'react'
import { upload } from "@spheron/browser-upload";
import { getDataVaultContract } from '../../helper/DataVaultSmartContract';
import { Contract } from 'ethers';
import { web3ConnectionAtom } from '../../atoms/web3Connection';
import { useAtom } from 'jotai';
import { Box, Button, LoadingOverlay, Modal, PasswordInput, TextInput } from '@mantine/core';
import { IconDatabase } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { CredentialsUploadProcessModel } from './CredentialsUploadProcessModel';
import { refeshDataAtom } from '../../atoms/refreshData';
import { getEncryptionPublicKey } from '../../helper/Utils';
import { getEncryptedMsg } from '../../helper/ApiCalls';


export default function CredentialsUpload() {
    const [web3ConnectionData, setWeb3ConnectionData] = useAtom(web3ConnectionAtom);
    const [uploadingCredential, setUploadingCredential] = useState<boolean>(false);
    const [uploadingProcessCount, setUploadingProcessCount] = useState<number>(0)
    const [opened, { open, close }] = useDisclosure(false);
    const [visible, { toggle }] = useDisclosure(false);


    const [refreshData, setRefreshData] = useAtom(refeshDataAtom);


    async function handleFormFile(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        open()

        const _website: string = e.target.website.value;
        const _usernameEmail: string = e.target.emailMore.value;
        const _password: string = e.target.password.value;
        if (_website && _usernameEmail && _password) {
            uploadCredentialsOnSmartContract(_website, _usernameEmail, _password);
        }
    }


    async function uploadCredentialsOnSmartContract(website: string, usernameEmail: string, password: string) {
        setUploadingCredential(true);
        open()
        try {
            setUploadingProcessCount(0)
            const _pEK: string = web3ConnectionData.encryptionPublicKey.length > 0 ? web3ConnectionData.encryptionPublicKey : await getEncryptionPublicKey(web3ConnectionData.walletAddress);
            setWeb3ConnectionData({ ...web3ConnectionData, encryptionPublicKey: _pEK })
            
            // const _eW = await getEncryptedMsg(website, _pEK);
            // const _eU = await getEncryptedMsg(usernameEmail, _pEK);
            const _eP = await getEncryptedMsg(password, _pEK);
            setUploadingProcessCount(1)
            
            const dataVault: Contract = getDataVaultContract();
            // const _addCredentialOfUser = await dataVault.addCredentialOfUser({ website:_eW, usernameOrEmailOrPhone: _eU, password:_eP });
            const _addCredentialOfUser = await dataVault.addCredentialOfUser({ website, usernameOrEmailOrPhone:usernameEmail, password:_eP });
            setUploadingProcessCount(2)
            const addedfile = await _addCredentialOfUser.wait()
            setUploadingProcessCount(3)
            setRefreshData({ ...refreshData, credentialsStatus: !refreshData.credentialsStatus, })

        } catch (error: any) {
            console.log(error?.message);
        } finally {
            setUploadingCredential(false)
        }
    }


    return (
        <>
            <Modal size="xl" ta="center" opened={opened} onClose={close} title="Uploading Process" centered>
                <CredentialsUploadProcessModel uploadingProcessCount={uploadingProcessCount} />
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


                <PasswordInput
                    visible={visible}
                    onVisibilityChange={toggle}
                    withAsterisk
                    required
                    disabled={uploadingCredential} placeholder='password' id='password' name='password'
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
