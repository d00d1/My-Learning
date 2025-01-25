window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
            document.getElementById('loginButton').addEventListener('click', login);
        } catch (error) {
            console.error('User denied account access');
        }
    } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});

async function login() {
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const message = 'Please sign this message to login: ' + new Date().toISOString();
    
    web3.eth.personal.sign(message, address, (err, signature) => {
        if (err) {
            console.error('Error signing message:', err);
            document.getElementById('status').innerText = 'Login failed';
        } else {
            console.log('Signed message:', signature);
            document.getElementById('status').innerText = 'Login successful!';
        }
    });
}
