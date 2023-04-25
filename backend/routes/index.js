import { Router } from "express";
import { SpheronClient, ProtocolEnum } from "@spheron/storage";

const router = Router();

const SPHERON_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlLZXkiOiJiYTdmYzNkOGQ4N2M1ZmEyNWNlMDI4YmYyNTQyNzBmMjJlZmEzZDFjZGExNDFmZDk2NTRiOWU0NTJkZmNmNzlhZTUwNWZjNTA1NmNmMDVmODYxYzRmNzFkYTcwZWU4N2ZjNDJjZDA5NTAzN2E3ZmExNGNjODFiNmU4YmJhMjQ5OSIsImlhdCI6MTY4MjQ1MjQ2NSwiaXNzIjoid3d3LnNwaGVyb24ubmV0d29yayJ9.kU60B94qXvWQ8JzHhuZ2H4x7QtSGpKCpIpybhf2fwSo"

router.get("/getuploadtoken", async (req, res) => {

    try {
        const bucketName = "learning spheron"; // use which ever name you prefer
        const protocol = ProtocolEnum.IPFS; // use which ever protocol you prefer

        const client = new SpheronClient({
            token: SPHERON_TOKEN,
        });

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

export default router;
