const HDWalletProvider = require('truffle-hdwallet-provider');

const Web3 = require('web3');
//const {interface,bytecode} = require('./compile');
const compileFactory = require('./build/CampaignFactory.json');
const compileCampaign= require('./build/Campaign.json');


const provider = new HDWalletProvider(
  'space dry perfect present celery metal toss net team brand average repair',
  'https://ropsten.infura.io/v3/776bb24e74674218ac515867ec212de4'
);

const web3 = new Web3(provider);

const deploy = async ()=>{
//  console.log(interface);
  const accounts = await web3.eth.getAccounts();
  // console.log('Attemp to deploy contract',accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compileFactory.interface)).deploy({data:'0x'+compileFactory.bytecode})
   .send({from:accounts[0],gas:'1000000'});

 console.log('Contract deployed to ',result.options.address);
}

deploy();
