const { OpenSeaStreamClient, Network } = require('@opensea/stream-js');
const { WebSocket } = require('ws');

// Stream api Client
const client = new OpenSeaStreamClient({
    network: process.env.NETWORK.toLowerCase().startsWith("main") ? Network.MAINNET : Network.TESTNET,
    token: process.env.OPENSEA_API_KEY || '2f6f419a083c46de9d83ce3dbe7db601', // process.env.API_KEY
    connectOptions: {
        transport: WebSocket
    }
});

module.exports = client;