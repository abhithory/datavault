export interface FileInterface{
    fileName:string,
    fileHash:string
}

export interface CredentialInterface{
    website:string,
    usernameOrEmailOrPhone:string,
    password:string,
}

export interface CredentialWithFunctionInterface{
    index:number,
    website:string,
    usernameOrEmailOrPhone:string,
    password:string,
    openCredentialModel:(n:number)=>void
}