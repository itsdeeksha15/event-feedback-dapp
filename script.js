let web3, contract, account;
const contractAddress = "PASTE_NEW_DEPLOYED_ADDRESS";

const abi = [
  { "inputs": [], "name": "giveGoodFeedback", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [], "name": "giveAverageFeedback", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [], "name": "getFeedbackCounts", "outputs": [
      { "type": "uint256" }, { "type": "uint256" }
    ], "stateMutability": "view", "type": "function" }
];

function showPopup(msg) {
    const p = document.getElementById("popup");
    p.innerText = msg;
    p.style.display = "block";
    setTimeout(() => p.style.display = "none", 2500);
}

function showSpinner(show) {
    document.getElementById("spinner").style.display = show ? "block" : "none";
}

function shortAddress(addr) {
    return addr.slice(0, 6) + "..." + addr.slice(-4);
}

async function connectWallet() {
    web3 = new Web3(window.ethereum);
    const accs = await ethereum.request({ method: "eth_requestAccounts" });
    account = accs[0];

    document.getElementById("wallet").innerText = "Wallet: " + shortAddress(account);
    contract = new web3.eth.Contract(abi, contractAddress);

    loadCounts();
    showPopup("Wallet connected");
}

async function loadCounts() {
    const counts = await contract.methods.getFeedbackCounts().call();
    document.getElementById("goodCount").innerText = counts[0];
    document.getElementById("avgCount").innerText = counts[1];
}

async function goodFeedback() {
    if (!contract) return showPopup("Connect wallet first");
    showSpinner(true);
    await contract.methods.giveGoodFeedback().send({ from: account });
    showSpinner(false);
    loadCounts();
    showPopup("Feedback submitted 👍");
}

async function averageFeedback() {
    if (!contract) return showPopup("Connect wallet first");
    showSpinner(true);
    await contract.methods.giveAverageFeedback().send({ from: account });
    showSpinner(false);
    loadCounts();
    showPopup("Feedback submitted 😐");
}

function toggleTheme() {
    document.body.classList.toggle("dark");
}