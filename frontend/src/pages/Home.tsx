import React, { useEffect, useState } from 'react'
import { upload } from "@spheron/browser-upload";



export default function Home() {

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

    // async function uploadFile(filePath:string, name:string) {
    //     console.log("uploading file");

    //     // const filePath = "";
    //     // const name = ""
    //     let currentlyUploaded:number = 0;
    //     const { uploadId, bucketId, protocolLink, dynamicLinks } = await client.upload(
    //         filePath,
    //         {
    //             protocol: ProtocolEnum.IPFS,
    //             name,
    //             onUploadInitiated: (uploadId) => {
    //                 console.log(`Upload with id ${uploadId} started...`);
    //             },
    //             onChunkUploaded: (uploadedSize, totalSize) => {
    //                 currentlyUploaded += uploadedSize;
    //                 console.log(`Uploaded ${currentlyUploaded} of ${totalSize} Bytes.`);
    //             },
    //         }
    //     );

    //     console.log('=================uploadedFile===================');
    //     console.log("uploadId",uploadId);
    //     console.log("bucketId",bucketId);
    //     console.log("protocolLink",protocolLink);
    //     console.log("dynamicLinks",dynamicLinks);
    //     console.log('====================================');

    //     // const upload: Upload = await client.getUpload(uploadId);
    //     // console.log(upload);
    // }

    async function handleFormFile(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        const _file: File = e.target.userfile.files[0];
        // here upload file on ipfs
        const response = await fetch(`http://localhost:8000/api/v1/getuploadtoken`);
        const resJson = await response.json();
        const token = resJson.uploadToken;

        let currentlyUploaded = 0;
        const uploadResult = await upload([_file], {
            token, onChunkUploaded: (uploadedSize, totalSize) => {
                currentlyUploaded += uploadedSize;
                console.log(`Uploaded ${currentlyUploaded} of ${totalSize} Bytes.`);
            },
        });

        console.log("uploadResult", uploadResult.protocolLink);

        // ------------- for uploading file in backend--------------
        // const formData = new FormData()
        // formData.append('userfile', _file)
        // const responseUpload = await fetch(`http://localhost:8000/api/v1/uploadFileToIPFS`, { method: "POST", body: formData }); // from step 1
        // const dataRes = await responseUpload.json();
        // console.log(dataRes);
    }

    async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        let _file: File | null  = e.target.files && e.target.files[0]
        setFileUploaded(_file)

        // let reader = new FileReader();
        // reader.onloadend = () => {
        //   console.log("url",reader.result);          
        // }
        // reader.readAsDataURL(file);
        // show basic details of file to user
        // name, size, type
        console.log('====================================');
    }


    return (
        <div>
            <button>Connect wallet</button>
            <p>address: { }</p>

            <h1>upload file</h1>
            <form onSubmit={handleFormFile}>
                <input type="file" name='userfile' id='userfile' onChange={handleFileUpload} />
                {fileUploaded && fileUploaded?.size > 0 && 
                <>
                <br />
                <p>size: {fileUploaded?.size}</p>
                <p>name: {fileUploaded?.name}</p>
                <p>type: {fileUploaded?.type}</p>
                </>
                }
                <br />
                <button type='submit'>Upload file</button>
            </form>

        </div>
    )
}
