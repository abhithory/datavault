import { useEffect, useState, useMemo, useCallback } from 'react';
import { web3ConnectionAtom } from '../../atoms/web3Connection';
import { useAtom } from 'jotai';
import { getDataVaultContract } from '../../helper/DataVaultSmartContract';
import { CredentialInterface, ExtendedCredentialInterface } from '../../helper/Interfaces';
import OneCredentialItem from './OneCredentialItem';
import { Loader, Modal } from '@mantine/core';
import { refeshDataAtom } from '../../atoms/refreshData';
import { useDisclosure } from '@mantine/hooks';
import ShowCredentialsModel from './ShowCredentialsModel';
import { decryptMessage } from '../../helper/Utils';

export default function AllCredentials() {
    const [web3ConnectionData,] = useAtom(web3ConnectionAtom);

    const [allCredentials, setAllCredentials] = useState<ExtendedCredentialInterface[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [refreshData,] = useAtom(refeshDataAtom);
    const [modelIndex, setModelIndex] = useState<number>(0);

    const [opened, { open, close }] = useDisclosure(false);


    useEffect(() => {
        if (web3ConnectionData.connected) {
            loadAllCredentials();
        }
    }, [refreshData.credentialsStatus || web3ConnectionData])


    async function loadAllCredentials() {
        setIsLoading(true)

        try {
            const dataVault = getDataVaultContract();
            const allCredentials:CredentialInterface[] = await dataVault.getAllCredentialsOfUser();
            const extendedFiles:ExtendedCredentialInterface[] = allCredentials.map(((item:CredentialInterface)=>{
                return {...item,decryptedStatus:false}
            }))
            setAllCredentials(extendedFiles);
        } catch (error: any) {
            console.log("error", error?.message);
        } finally {
            setIsLoading(false)
        }
    }

    function openCredentialModel(n:number){
        setModelIndex(n)
        open()
    }

    async function DecryptCredentials(n:number) {
        try {            
            const _decryptedMsg = await decryptMessage(allCredentials[n].password,web3ConnectionData.walletAddress);
            setAllCredentials(allCredentials.map((file:ExtendedCredentialInterface,i:number)=>{
                if (i === n) {
                    return {...file,password:_decryptedMsg,decryptedStatus:true}
                }
                return file
            }))
        } catch (error) {
            
        }
    }

    return (
        <div>
            <Modal size="md" padding="xl" ta="center" opened={opened} onClose={close} title="Your Credentials" centered>
                <ShowCredentialsModel website={allCredentials[modelIndex]?.website || ""} usernameOrEmailOrPhone={allCredentials[modelIndex]?.usernameOrEmailOrPhone || ""} password={allCredentials[modelIndex]?.password || ""}   />
            </Modal>

            <h2>All Credentials of User</h2>

            <div className="itemContainer">
                {isLoading ?
                    <Loader />
                    :
                    (allCredentials.length > 0 ? allCredentials.map((file, key) => <OneCredentialItem key={key} index={key} openCredentialModel={openCredentialModel} website={file.website} usernameOrEmailOrPhone={file.usernameOrEmailOrPhone} password={file.password} decryptedStatus={file.decryptedStatus} DecryptCredentials={DecryptCredentials} />): 
                    <h1>You Haven't uploaded any Credentials yet</h1>
                    )
                }

            </div>
        </div>
    )
}

