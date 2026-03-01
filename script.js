let web3;
let contract;
let account;

const contractAddress = "0xb0782271f6Cb1a26EF01c0197a16cA2687FFB5Ee";

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

async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        account = accounts[0];
        document.getElementById("account").innerText = "Connected: " + account;
        contract = new web3.eth.Contract(abi, contractAddress);
    }
}

async function goodFeedback() {
    await contract.methods.giveGoodFeedback().send({ from: account });
    alert("Thank you for your feedback!");
}

async function averageFeedback() {
    await contract.methods.giveAverageFeedback().send({ from: account });
    alert("Thank you for your feedback!");
}