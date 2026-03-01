let web3;
let contract;
let account;

const contractAddress = "0x8B7b5f1d0461918fBe03976d643d4011860500eE";

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
  },
  {
    "inputs": [],
    "name": "getFeedbackCounts",
    "outputs": [
      { "type": "uint256" },
      { "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

function showPopup(message) {
    const popup = document.getElementById("popup");
    popup.innerText = message;
    popup.style.display = "block";
    setTimeout(() => popup.style.display = "none", 2500);
}

function showSpinner(show) {
    document.getElementById("spinner").style.display = show ? "block" : "none";
}

function shortAddress(addr) {
    return addr.slice(0, 6) + "..." + addr.slice(-4);
}

async function connectWallet() {
    if (!window.ethereum) {
        showPopup("MetaMask not found");
        return;
    }

    web3 = new Web3(window.ethereum);

    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
    });

    account = accounts[0];

    contract = new web3.eth.Contract(abi, contractAddress);

    document.getElementById("wallet").innerText =
        "Wallet: " + shortAddress(account);

    await loadCounts();
    showPopup("Wallet connected successfully");
}

async function loadCounts() {
    if (!contract) return;
    const counts = await contract.methods.getFeedbackCounts().call();
    document.getElementById("goodCount").innerText = counts[0];
    document.getElementById("avgCount").innerText = counts[1];
}

async function goodFeedback() {
    if (!account || !contract) {
        showPopup("Please connect MetaMask first");
        return;
    }

    showSpinner(true);
    await contract.methods.giveGoodFeedback().send({ from: account });
    showSpinner(false);

    await loadCounts();
    showPopup("Feedback submitted 👍");
}

async function averageFeedback() {
    if (!account || !contract) {
        showPopup("Please connect MetaMask first");
        return;
    }

    showSpinner(true);
    await contract.methods.giveAverageFeedback().send({ from: account });
    showSpinner(false);

    await loadCounts();
    showPopup("Feedback submitted 😐");
}

function toggleTheme() {
    document.body.classList.toggle("dark");
}