let web3;
let contract;
let account;

const contractAddress = "PASTE_YOUR_DEPLOYED_CONTRACT_ADDRESS";

const abi = [
  {
    "inputs": [],
    "name": "giveGoodFeedback",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "giveAverageFeedback",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

function showPopup(message) {
    const popup = document.getElementById("popup");
    popup.innerText = message;
    popup.style.display = "block";

    setTimeout(() => {
        popup.style.display = "none";
    }, 2500);
}

async function connectWallet() {
    if (!window.ethereum) {
        showPopup("MetaMask not found");
        return;
    }

    web3 = new Web3(window.ethereum);
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    account = accounts[0];

    contract = new web3.eth.Contract(abi, contractAddress);

    showPopup("Wallet connected successfully");
}

async function goodFeedback() {
    if (!contract) {
        showPopup("Connect wallet first");
        return;
    }

    await contract.methods.giveGoodFeedback().send({ from: account });
    showPopup("Thank you for your feedback 👍");
}

async function averageFeedback() {
    if (!contract) {
        showPopup("Connect wallet first");
        return;
    }

    await contract.methods.giveAverageFeedback().send({ from: account });
    showPopup("Feedback recorded 😐");
}