const path = require('path');

const solc = require('solc');

const fs = require('fs-extra');

const buildpath = path.resolve(__dirname,'build');

fs.removeSync(buildpath);

const CampaignPath = path.resolve(__dirname,'contracts','campaign.sol');

const source = fs.readFileSync(CampaignPath,'utf8');

const output = solc.compile(source,1).contracts;

//console.log(output);
fs.ensureDirSync(buildpath);

for (let contract in output) {
  fs.outputJsonSync(path.resolve(buildpath,contract.replace(":","") + '.json'),output[contract]);
}
