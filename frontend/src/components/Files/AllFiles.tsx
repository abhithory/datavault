import { useEffect, useState } from 'react';
import { web3ConnectionAtom } from '../../atoms/web3Connection';
import { useAtom } from 'jotai';
import { getDataVaultContract } from '../../helper/DataVaultSmartContract';
import { FileInterface } from '../../helper/Interfaces';
import OneFileItem from './OneFileItem';
import { Loader } from '@mantine/core';
import { refeshDataAtom } from '../../atoms/refreshData';

export default function AllFiles() {
    const [web3ConnectionData,] = useAtom(web3ConnectionAtom);
    const [refreshData,] = useAtom(refeshDataAtom);

    const [allFiles, setAllFiles] = useState<FileInterface[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (web3ConnectionData.connected) {
            loadAllFiles();
        }
    }, [web3ConnectionData || refreshData.fileStatus])

    async function loadAllFiles() {
        setIsLoading(true)
        try {
            const dataVault = getDataVaultContract();
            const allFiles = await dataVault.getAllFilesOfUser();
            setAllFiles(allFiles);
        } catch (error: any) {
            console.log("error", error?.message);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <h2>All Files of User</h2>

            <div className="itemContainer">
                {isLoading ?
                    <Loader />
                    :
                    allFiles && allFiles.map((file, key) => <OneFileItem key={key} fileName={file.fileName} fileHash={file.fileHash} />)
                }
            </div>
        </div>
    )
}

