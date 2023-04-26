import { Router } from "express";
import { SpheronClient, ProtocolEnum } from "@spheron/storage";
const router = Router();

import multer from "multer"
// const upload = multer({ dest: "uploads/" });
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Uploads is the Upload_folder_name
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + ".jpg")
    }
})
const upload = multer({ storage: storage })
// const upload = multer({ dest: os.tmpdir() });


const SPHERON_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlLZXkiOiJiYTdmYzNkOGQ4N2M1ZmEyNWNlMDI4YmYyNTQyNzBmMjJlZmEzZDFjZGExNDFmZDk2NTRiOWU0NTJkZmNmNzlhZTUwNWZjNTA1NmNmMDVmODYxYzRmNzFkYTcwZWU4N2ZjNDJjZDA5NTAzN2E3ZmExNGNjODFiNmU4YmJhMjQ5OSIsImlhdCI6MTY4MjQ1MjQ2NSwiaXNzIjoid3d3LnNwaGVyb24ubmV0d29yayJ9.kU60B94qXvWQ8JzHhuZ2H4x7QtSGpKCpIpybhf2fwSo"
const client = new SpheronClient({
    token: SPHERON_TOKEN,
});

router.get("/getuploadtoken", async (req, res) => {

    try {
        const bucketName = "learning spheron"; // use which ever name you prefer
        const protocol = ProtocolEnum.IPFS; // use which ever protocol you prefer
        const { uploadToken } = await client.createSingleUploadToken({
            name: bucketName,
            protocol,
        });
        res.status(200).json({
            uploadToken,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: error.message
        });
    }


});


router.post("/uploadFileToIPFS", upload.single("userfile"), async (req, res) => {

    try {
        const file = req.file;
        let currentlyUploaded = 0;
        const { uploadId, bucketId, protocolLink, dynamicLinks } = await client.upload(
            file.path,
            {
                protocol: ProtocolEnum.IPFS,
                name: file.originalname,
                onUploadInitiated: (uploadId) => {
                    console.log(`Upload with id ${uploadId} started...`);
                },
                onChunkUploaded: (uploadedSize, totalSize) => {
                    currentlyUploaded += uploadedSize;
                    console.log(`Uploaded ${currentlyUploaded} of ${totalSize} Bytes.`);
                },
            }
        );
        res.status(200).json({
            uploadId, bucketId, protocolLink, dynamicLinks
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });

    }

})

export default router;
