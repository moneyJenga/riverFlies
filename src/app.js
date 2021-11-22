const provider = new ethers.providers.Web3Provider(window.ethereum);
const displayBal = document.getElementById("displayBal");
const button = document.getElementById("ConnectWallet");

var connected = false;

const connectMint = async () =>  {
    if (!connected) {
        // connect account
        var account = await window.ethereum.request({ method: 'eth_requestAccounts' });
        displayBal.innerHTML = "Fly culture container: " +  account;
        button.innerHTML = "Culture";

        // get contract object with connected account as signer

        connected = true;
    } else {
        const signer = provider.getSigner();
        const contract = await new ethers.Contract(minter.address, minter.abi, signer);
        let mintReady = await contract.activateMint();
        console.log(mintReady);
        if (mintReady) {
            const options = await {value: ethers.utils.parseEther("0.1")};
            let tx = await contract.culture(options);
            console.log(tx);
        } else {
            displayBal.innerHTML = "Fly culture not ready, come back soon!";
        }

    }
}
button.addEventListener("click",connectMint)

// GALLERY
tokenIDinput = document.getElementById("tokenId")
const showFly = async () => {
    const signer = provider.getSigner();
    const contract = await new ethers.Contract(
        minter.address, minter.abi,
        signer
    );
    let value = await tokenIDinput.value;
    let metadata = await contract.tokenURI(value);
    metadata = await $.getJSON(metadata);
    document.getElementById("gallery").src = metadata.image;
}

document.getElementById("Display").addEventListener("click", showFly)