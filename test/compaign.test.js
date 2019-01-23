const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

const compileFactory = require('../ethereum/build/CampaignFactory.json');
const compileCampaign= require('../ethereum/build/Campaign.json');


var accounts;
var factory;
var campaignAddress;
var campaign;

beforeEach(async()=>{
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compileFactory.interface))
    .deploy({data:'0x' + compileFactory.bytecode})
    .send({from:accounts[0],gas:'1000000'});

    await factory.methods.createCampaign('100').send({from:accounts[0],gas:'1000000'});

    [campaignAddress] = await factory.methods.getDeployedCampaign().call();

    campaign = await new web3.eth.Contract(JSON.parse(compileCampaign.interface),campaignAddress);
})

describe('campaign',()=>{
  it('deploy a factory and campaign',()=>{
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  })

  it('manager address',async()=>{
    const manager = await campaign.methods.manager().call();
    assert(manager,accounts[0]);
  })

  it('allow people to contribute',async ()=>{
    await campaign.methods.Contribute().send({
      from:accounts[1],
      value:'2000'
    });
     const isContribute = await campaign.methods.approvers(accounts[1]).call();
     assert(isContribute);
  })

  it('require a mininum contribute',async ()=>{
    try {
      await campaign.methods.Contribute().send({
        from:accounts[1],
        value:'5'
      });
       const isContribute = await campaign.methods.approvers(accounts[1]).call();
       assert(isContribute);
    }catch(err){
    assert(err);
    }
  })

  it('allows a manager to make request',async()=>{
    await campaign.methods.CreateRequest(accounts[1],'xuexi','10000',)
    .send({from:accounts[0],gas:'1000000'});
    const request1 = await campaign.methods.requests(0).call();
    assert.equal('xuexi',request1.description);
  })




})
