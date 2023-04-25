import React from 'react'
import { upload } from "@spheron/browser-upload";



export default function Home() {

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
        console.log('===============handleFormFile=====================');
        const _file: File = e.target.userfile.files[0];
        console.log(_file);

        // here upload file on ipfs
        const response = await fetch(`http://localhost:8000/api/v1/getuploadtoken`); // from step 1
        const resJson = await response.json();
        const token = resJson.uploadToken;
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXBsb3ltZW50SWQiOiI2NDQ4NDVlMDIwMjc3YTAwMTJlOTNiOTciLCJzaW5nbGVEZXBsb3ltZW50Ijp0cnVlLCJwYXlsb2FkU2l6ZSI6NTI0Mjg4MCwicGFyYWxsZWxVcGxvYWRDb3VudCI6NSwiaWF0IjoxNjgyNDU4MDgwLCJleHAiOjE2ODI0NTg2ODAsImlzcyI6Ind3dy5zcGhlcm9uLm5ldHdvcmsifQ.F2n0q4iyysHklirBjs2Vrz6bKNui5i8aZy--HBvb8TQ"
        console.log(token);

        let currentlyUploaded = 0;
        const uploadResult = await upload([_file], {
            token, onChunkUploaded: (uploadedSize, totalSize) => {
                currentlyUploaded += uploadedSize;
                console.log(`Uploaded ${currentlyUploaded} of ${totalSize} Bytes.`);
            },
        });

        console.log("uploadResult", uploadResult.protocolLink);
        console.log('====================================');
    }

    function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        console.log('============handleFileUpload========================');

        let file: any = e.target.files && e.target.files[0]
        console.log(file);

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
                <br />
                <button type='submit'>Upload file</button>
            </form>

        </div>
    )
}
