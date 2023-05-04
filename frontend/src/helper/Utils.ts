import CryptoJS from "crypto-js"

export async function getEncryptionPublicKey(publicWalletAdr:string): Promise<string> {
        const _key: string = await (window.ethereum as any).request({
            method: 'eth_getEncryptionPublicKey',
            params: [publicWalletAdr],
        });
        return _key
}

export async function decryptMessage(encryptedMsg: string, publicWalletAdr:string): Promise<string> {
    const data = await (window.ethereum as any).request({
        method: 'eth_decrypt',
        params: [encryptedMsg, publicWalletAdr],
    });
    return data
}

function generateRandomKey(): string {
    return CryptoJS.lib.WordArray.random(24).toString(CryptoJS.enc.Base64)
}



// For Encrypting & Decrypting file 

export function encryptFile(file: Blob) {
    return new Promise((resolve, error) => {
        const reader = new FileReader()
        reader.onload = () => {
            const key = generateRandomKey();
            const _wArray = CryptoJS.lib.WordArray.create(reader.result as any);
            const encryptedFile = CryptoJS.AES.encrypt(_wArray, key).toString();
            resolve({
                key,
                encryptedFile
            })
        }
        reader.readAsArrayBuffer(file);
    })
}

function convertWordArrayToUint8Array(wordArray: CryptoJS.lib.WordArray) {
    let arrayOfWords = wordArray.hasOwnProperty("words") ? wordArray.words : []
    let length = wordArray.hasOwnProperty("sigBytes") ? wordArray.sigBytes : arrayOfWords.length * 4
    let uInt8Array = new Uint8Array(length), index = 0, word, i
    for (i = 0; i < length; i++) {
        word = arrayOfWords[i]
        uInt8Array[index++] = word >> 24
        uInt8Array[index++] = (word >> 16) & 0xff
        uInt8Array[index++] = (word >> 8) & 0xff
        uInt8Array[index++] = word & 0xff
    }
    return uInt8Array
}


export function decryptFile(data: Blob, key: string): Promise<Blob> {
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = () => {
            const decrypted = CryptoJS.AES.decrypt(reader.result as any, key)
            const typedArray = convertWordArrayToUint8Array(decrypted)
            resolve(new Blob([typedArray]))
        }
        reader.readAsText(data)
    })
}
