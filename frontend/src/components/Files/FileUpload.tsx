import React, { useEffect, useState } from 'react'
import { upload } from "@spheron/browser-upload";
import { getDataVaultContract } from '../../helper/DataVaultSmartContract';
import { Contract } from 'ethers';
import { web3ConnectionAtom } from '../../atoms/web3Connection';
import { useAtom } from 'jotai';
import { FileInput } from './FileInput';
import { Modal, Group, Box, Button, LoadingOverlay, TextInput, Badge } from '@mantine/core';
import { IconDatabase } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { FileUploadProcessModel } from './FileUploadProcessModel';
import { refeshDataAtom } from '../../atoms/refreshData';
import { getEncryptedMsg, getFileUploadToken } from '../../helper/ApiCalls';
import { getEncryptionPublicKey } from '../../helper/Utils';

export default function FileUpload() {

    const [uploadingFile, setUploadingFile] = useState<boolean>(false);
    const [web3ConnectionData, setWeb3ConnectionData] = useAtom(web3ConnectionAtom);
    const [opened, { open, close }] = useDisclosure(false);
    const [refreshData, setRefreshData] = useAtom(refeshDataAtom);
    const [fileName, setFileName] = useState<string>("")
    const [uploadingProcessCount, setUploadingProcessCount] = useState<number>(0)


    interface FileType {
        lastModified: number,
        lastModifiedDate: string,
        name: string,
        size: number,
        type: string,
        webkitRelativePath: string
    }
    const [fileUploaded, setFileUploaded] = useState<File | null | FileType>({
        lastModified: 0,
        lastModifiedDate: "",
        name: "",
        size: 0,
        type: "",
        webkitRelativePath: ""
    });


    async function handleUploadFile() {
        if (!fileUploaded) return
        open()
        setUploadingFile(true)

        // const _nospaceNameFile = fileName.replaceAll(" ", "-") + "." + fileUploaded.name.split(".").at(-1);
        // setFileName(_nospaceNameFile);
        try {
            setUploadingProcessCount(0)
            const _file: File | FileType = fileUploaded;
            // const _file: File | FileType = { ...fileUploaded, name: _nospaceNameFile };
            const token = await getFileUploadToken();
            let currentlyUploaded = 0;
            const uploadResult = await upload([_file as File], {
                token, onChunkUploaded: (uploadedSize, totalSize) => {
                    currentlyUploaded += uploadedSize;
                    // console.log(`Uploaded ${currentlyUploaded} of ${totalSize} Bytes.`);
                },
            });
            
            setUploadingProcessCount(1)
            const _pEK: string = web3ConnectionData.encryptionPublicKey.length > 0 ? web3ConnectionData.encryptionPublicKey : await getEncryptionPublicKey(web3ConnectionData.walletAddress);
            setWeb3ConnectionData({ ...web3ConnectionData, encryptionPublicKey: _pEK })
            const _encrypteLink = await getEncryptedMsg(uploadResult.protocolLink, _pEK);
            setUploadingProcessCount(2)
            await uploadFileOnSmartContract(fileName, _encrypteLink);

        } catch (error) {
            console.log(error);

        } finally {
            setUploadingFile(false)
        }
        // ------------- for uploading file in backend--------------
        // const formData = new FormData()
        // formData.append('userfile', _file)
        // const responseUpload = await fetch(`http://localhost:8000/api/v1/uploadFileToIPFS`, { method: "POST", body: formData }); // from step 1
        // const dataRes = await responseUpload.json();
        // console.log(dataRes);
    }


    async function uploadFileOnSmartContract(_name: string, _hash: string) {

        try {
            const dataVault: Contract = getDataVaultContract();
            const _addFileOfUser = await dataVault.addFileOfUser({ fileName: _name, fileHash: _hash });
            setUploadingProcessCount(3)

            const addedfile = await _addFileOfUser.wait()
            setUploadingProcessCount(4)
            setRefreshData({ ...refreshData, fileStatus: !refreshData.fileStatus })
        } catch (error: any) {
            console.log(error);
            console.log(error?.message);

        }

    }

    async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        let _file: File | null = e.target.files && e.target.files[0]
        setFileUploaded(_file)
        setFileName(_file?.name?.split(".").slice(0, -1).join(".") as string);
        // let reader = new FileReader();
        // reader.onloadend = () => {
        //   console.log("url",reader.result);          
        // }
        // reader.readAsDataURL(file);
        // show basic details of file to user
        // name, size, type
    }


    function convertInMb(inByte: number): string {
        return (inByte / 1000).toFixed(3) + " KB"
    }


    return (
        <>

            <Modal size="xl" ta="center" opened={opened} onClose={close} title="Uploading Process" centered>
                <FileUploadProcessModel uploadingProcessCount={uploadingProcessCount} />
            </Modal>

            <h1>Upload file</h1>

            {/* // TODO: file upload process */}

            <FileInput handleFileUpload={handleFileUpload} />
            {fileUploaded && fileUploaded?.size > 0 &&
                <>
                    <TextInput
                        type='text'
                        placeholder="Your name"
                        label="File Name"
                        withAsterisk
                        disabled={uploadingFile}
                        value={fileName} onChange={(e) => {
                            setFileName(e.target.value);
                        }}
                    />
                    <Badge mt="sm" radius="sm" color='violet'>Size: {convertInMb(fileUploaded?.size)}</Badge>
                </>
            }
            <br />
            <Button loading={uploadingFile} rightIcon={<IconDatabase />} onClick={handleUploadFile} disabled={!web3ConnectionData.connected || !Boolean(fileUploaded?.size)} variant="outline">
                Upload File
            </Button>

            {!web3ConnectionData.connected &&
                <p>Please connect wallet first</p>
            }

        </>
    )
}
