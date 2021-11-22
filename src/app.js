var provider = new ethers.providers.Web3Provider(window.ethereum);
const displayBal = document.getElementById("displayBal");
const button = document.getElementById("ConnectWallet");

var connected = false;

const isMoonriver = async () => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    var chainId = await provider.getNetwork();
    if (chainId.chainId == 1285) {
        return true;
    } else  {
        return false;
    }
}

const connectMint = async () =>  {
    if (!connected) {
        if (await isMoonriver()) {
            // connect account
            var account = await window.ethereum.request({ method: 'eth_requestAccounts' });
            displayBal.innerHTML = "Fly culture tub - " +  account;
            button.innerHTML = "Culture";
            connected = true;
        } else {
            if (["Please switch to Moonriver network!","<big>I said switch to Moonriver!!</big>"].includes(displayBal.innerHTML)) {
                displayBal.innerHTML = "<big>I said switch to Moonriver!!</big>";
            } else {
                displayBal.innerHTML = "Please switch to Moonriver network!";
            }
        }
    } else {
        if (await isMoonriver()) {
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
        } else {
            displayBal.innerHTML = "Please switch to Moonriver network!";
            connected = false;
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