# NFT MARKETPLACE WITH LATCH

```bash
$ node -v
$ v19.6.1
```

To run the frontend, run the commands below.
Create a .env file and fill the next params. The RPC_MUMBAI_URL is the url of the mumbai testnet, the REACT_APP_PRIVATE_KEY is your private key, the REACT_APP_PINATA_KEY is apikey of pinata, which is where we are going to upload all the images of the NFT, REACT_APP_PINATA_SECRET the secret key of pinata and the BACKEND_URL is the url of the backend.

```bash
REACT_APP_PRIVATE_KEY=""
REACT_APP_PINATA_KEY=""
REACT_APP_PINATA_SECRET=""
RPC_MUMBAI_URL = ''
BACKEND_URL= 'http://localhost:8080'
```

To run the frontend:
```bash
npm install
npm start
```
To update the smart contract address, you have to deploy it again using the script 
```bash
npx hardhat run --network mumbai scripts/deploy.js 
```

To run the backend, run the commands below.(Different terminal)
Create a .env file and fill the next params, MY_APPID and MY_SECRETKEY are the params of the latch app. The MONGO_URI is the url of the mongo database, and the FRONTEND_URL is the url of the frontend.

```bash
MONGO_URI=''

FRONTEND_URL='http://localhost:3000'

MY_APPID = ''
MY_SECRETKEY = ''

```
To run the backend:

```bash
npm install
npm start
```
