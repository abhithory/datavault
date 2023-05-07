async function loadDetails() {
    console.log('=====================fdata vault extention===============');

    console.log('====================================');
    console.log(window);
    console.log(window.ethereum);
    console.log(window.window.ethereum);
    console.log('====================================');

    if (window.ethereum) {
        console.log("metamask extention detected");
        console.log('====================================');
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const accounts = await provider.send("eth_requestAccounts", []);
        // console.log('===============accounts=====================');
        // console.log(accounts);
        // console.log('====================================');
    } else {
        console.log("metamask Not extention detected");
    }
}

loadDetails()