import { Router } from "express";
import { SpheronClient, ProtocolEnum } from "@spheron/storage";
import sigUtil from '@metamask/eth-sig-util'
const router = Router();
import multer from "multer"
import { config } from "dotenv";
config();


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
const client = new SpheronClient({
    token: process.env.SPHERON_TOKEN,
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


router.get("/encryptMessage", async (req, res) => {
    const {msg, publicencryptkey} = req.headers;
    try {
        const encryptedObj = sigUtil.encrypt({
            publicKey: publicencryptkey,
            data: msg,
            version: 'x25519-xsalsa20-poly1305'
        })
        const encryptedText = Buffer.from(JSON.stringify(encryptedObj), "utf8").toString("hex");
        return res.status(200).json({
            encryptedText,
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message: error.message
        });
    }


});

export default router;
