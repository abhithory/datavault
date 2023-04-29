import { useEffect, useState, useMemo, useCallback } from 'react';
import { web3ConnectionAtom } from '../../atoms/web3Connection';
import { useAtom } from 'jotai';
import { getDataVaultContract } from '../../helper/DataVaultSmartContract';
import { CredentialInterface } from '../../helper/Interfaces';
import OneCredentialItem from './OneCredentialItem';
import { Loader, Modal } from '@mantine/core';
import { refeshDataAtom } from '../../atoms/refreshData';
import { useDisclosure } from '@mantine/hooks';
import ShowCredentialsModel from './ShowCredentialsModel';

export default function AllCredentials() {
    const [web3ConnectionData,] = useAtom(web3ConnectionAtom);

    const [allCredentials, setAllCredentials] = useState<CredentialInterface[]>([])
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
            const allCredentials = await dataVault.getAllCredentialsOfUser();
            setAllCredentials(allCredentials);
        } catch (error: any) {
            console.log("error", error?.message);
        } finally {
            setIsLoading(false)
        }
    }

    function openCredentialModel(n:number){
        console.log(n);
        setModelIndex(n)
        open()
    }

    return (
        <div>
            <Modal size="xl" ta="center" opened={opened} onClose={close} title="Uploading Process" centered>
                <ShowCredentialsModel website={allCredentials[modelIndex].website} usernameOrEmailOrPhone={allCredentials[modelIndex].usernameOrEmailOrPhone} password={allCredentials[modelIndex].password}   />
            </Modal>

            <h2>All Credentials of User</h2>

            <div className="itemContainer">
                {isLoading ?
                    <Loader />
                    :
                    allCredentials && allCredentials.map((file, key) => <OneCredentialItem key={key} index={key} openCredentialModel={openCredentialModel} website={file.website} usernameOrEmailOrPhone={file.usernameOrEmailOrPhone} password={file.password} />)
                }

            </div>
        </div>
    )
}

