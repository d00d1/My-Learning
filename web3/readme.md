Install required packages:

bash
npm install web3

Create an HTML file (index.html):
html
<!DOCTYPE html>
<html>
<head>
    <title>Web3 Local Login</title>
    <script src="https://cdn.jsdelivr.net/npm/web3@1.3.6/dist/web3.min.js"></script>
</head>
<body>
    <h1>Web3 Local Login</h1>
    <button id="loginButton">Login with Ethereum</button>
    <div id="status"></div>

    <script src="app.js"></script>
</body>
</html>

Create a JavaScript file (app.js):
javascript
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
This example uses MetaMask to connect to the Ethereum network and sign a message for authentication. Make sure you have MetaMask installed in your browser for this to work.