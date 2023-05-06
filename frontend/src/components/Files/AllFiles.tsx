import { useEffect, useState } from 'react';
import { web3ConnectionAtom } from '../../atoms/web3Connection';
import { useAtom } from 'jotai';
import { getDataVaultContract } from '../../helper/DataVaultSmartContract';
import { ExtendedFileInterface, FileInterface } from '../../helper/Interfaces';
import OneFileItem from './OneFileItem';
import { Loader } from '@mantine/core';
import { refeshDataAtom } from '../../atoms/refreshData';
import { decryptFile, decryptMessage } from '../../helper/Utils';
import saveAs from "file-saver"


export default function AllFiles() {
    const [web3ConnectionData,] = useAtom(web3ConnectionAtom);
    const [refreshData,] = useAtom(refeshDataAtom);

    const [allFiles, setAllFiles] = useState<ExtendedFileInterface[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isDownloading, setIsDownloading] = useState(false);

    useEffect(() => {
        if (web3ConnectionData.connected) {
            loadAllFiles();
        }
    }, [refreshData.fileStatus || web3ConnectionData])


    async function loadAllFiles() {
        setIsLoading(true)
        try {
            const dataVault = getDataVaultContract();
            const allFiles: FileInterface[] = await dataVault.getAllFilesOfUser();
            const extendedFiles: ExtendedFileInterface[] = allFiles.map(((item: FileInterface) => {
                return { ...item, decryptedStatus: false }
            }))

            setAllFiles(extendedFiles);
        } catch (error: any) {
            console.log("error", error?.message);
        } finally {
            setIsLoading(false)
        }
    }

    async function DecryptFile(n: number) {
        try {
            if (allFiles[n].advanceEncryptionStatus) {
                const _decryptedMsg = await decryptMessage(allFiles[n].decryptKey, web3ConnectionData.walletAddress);
                setAllFiles(allFiles.map((file: ExtendedFileInterface, i: number) => {
                    if (i === n) {
                        return { ...file, decryptKey: _decryptedMsg, decryptedStatus: true }
                    }
                    return file
                }))
            } else {
                const _decryptedMsg = await decryptMessage(allFiles[n].fileHash, web3ConnectionData.walletAddress);
                setAllFiles(allFiles.map((file: ExtendedFileInterface, i: number) => {
                    if (i === n) {
                        return { ...file, fileHash: _decryptedMsg + "/" + file.fileName, decryptedStatus: true }
                    }
                    return file
                }))
            }
        } catch (error) {

        }
    }

    async function downloadEncryptedFile(n: number) {
        setIsDownloading(true)
        try {
            const _fullLink = allFiles[n].fileHash + "/" + allFiles[n].fileName;
            const _res = await fetch(_fullLink);
            const encryptedFile = await _res.blob();
            const decryptedFile = await decryptFile(encryptedFile, allFiles[n].decryptKey);
            saveAs(decryptedFile, allFiles[n].fileName+".zip")
            
        } catch (error) {
            
        } finally {
            setIsDownloading(false)
        }
    }
    return (
        <div>
            <h2>All Files of User</h2>

            <div className="itemContainer">
                {isLoading ?
                    <Loader />
                    :
                    (allFiles.length > 0 ? allFiles.map((file, key) => <OneFileItem key={key} index={key} fileName={file.fileName} fileHash={file.fileHash} decryptedStatus={file.decryptedStatus} DecryptFile={DecryptFile} advanceEncryptionStatus={file.advanceEncryptionStatus} downloadEncryptedFile={downloadEncryptedFile} isDownloading={isDownloading} />) :
                        <h1>You Haven't uploaded any file yet</h1>)
                }
            </div>
        </div>
    )
}

