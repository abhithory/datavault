import { getEncryptionPublicKey } from "./Utils";

const backendBaseUrl = "http://localhost:8000/api/v1";

export async function getFileUploadToken(): Promise<string> {
    const response = await fetch(`${backendBaseUrl}/getuploadtoken`);
    const _data = await response.json();
    return _data.uploadToken
}

export async function getEncryptedMsg(msg: string,publicencryptkey:string): Promise<string> {
    const response = await fetch(`${backendBaseUrl}/encryptMessage`,{headers:{
        msg, publicencryptkey
    }});
    const _data = await response.json();
    return _data.encryptedText
}
