import web3 from './web3';

import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x98892e026bdF99D0032e2F24b48D8290d7B44f11'
)

export default instance;
