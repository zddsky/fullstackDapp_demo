import Web3 from 'web3';


var web3;
if(typeof window !='undefined' && window.web3 !='undefined'){
   web3 = new Web3(window.web3.currentProvider);
}else {
  const provider = new Web3.providers.HttpProvider(
    'https://ropsten.infura.io/v3/776bb24e74674218ac515867ec212de4'
  );
  web3 = new Web3(provider);
}


export default web3;
