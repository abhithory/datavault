
document.getElementById('getCredentialsBtn').addEventListener('click', function () {
    // chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    //     var currentUrl = tabs[0].url;
    //     // alert(currentUrl)
    //     console.log('==================current website==================');
    //     console.log(currentUrl);
    //     console.log('====================================');

    // });
    console.log('===============clicked=====================');
    codeToInject();
    // connectToWallet();
    console.log('====================================');
});


async function connectToWallet() {
    console.log('====================================');
    console.log(window);
    console.log(window.ethereum);
    console.log('====================================');
    if (window.ethereum) {
        console.log('====================================');
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

// async function connectToWallet() {
//     if (window.ethereum) {
//         const provider = getWeb3Provider();
//         const { chainId } = await provider.getNetwork();
//         if (String(chainId) === String(networkChainId)) {
//             setIsNetworkWrong(false)
//             const accounts = await provider.send("eth_requestAccounts", []);
//             setWeb3ConnectionData({ ...web3ConnectionData, connected: true, walletAddress: accounts[0] });
//         } else {
//             setIsNetworkWrong(true)
//         }
//     } else {
//         setError("Please install metamask wallet")
//     }
// }

// async function isConnected() {
//     const provider = getWeb3Provider();
//     const addresses = await provider.listAccounts();
//     return addresses.length > 0
// }



function codeToInject() {
    // Do here whatever your script requires. For example:
    console.log('==============injected code ======================');

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript(tabs[0].id,
            {
                file: "gscript.js",
            });

    });

    console.log('====================================');
}

