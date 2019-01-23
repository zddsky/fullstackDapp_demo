pragma solidity ^0.4.24;

contract CampaignFactory{
  address[] public deployedCampain;
  function createCampaign(uint mininum) public{
    address newCampaign = new Campaign(mininum,msg.sender);
    deployedCampain.push(newCampaign);
  }
  function getDeployedCampaign() public view returns(address[]){
    return deployedCampain;
  }
}

contract Campaign{

    struct Request{
        string description;
        uint value;
        address recipien;
        bool complete;
        uint approvercount;
        mapping(address=>bool) approvers;
    }

        Request[] public requests;
        address public manager;
        uint  public mininumContribution;
        uint  public approvelvalues;
        uint public approvercount;
        mapping(address=>bool) public approvers;



    modifier Requestmanager{
        require(msg.sender == manager);
        _;
    }


    constructor(uint _mininum,address _manager) public{
        manager = _manager;
        mininumContribution = _mininum;
    }


    function Contribute() public payable{
        require(msg.value > mininumContribution);
        approvers[msg.sender] =  true;
        approvercount++;
    }

    function CreateRequest(address _addr,string _descrip,uint _value) public Requestmanager{
        Request memory newquest = Request({
            description:_descrip,
            value:_value,
            recipien:_addr,
            complete:false,
            approvercount:0
        });
        requests.push(newquest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];
        require(approvers[msg.sender]);
        require(!request.approvers[msg.sender] );
        request.approvers[msg.sender] = true;
        request.approvercount++;
    }

    function FinalzeRequest(uint index) payable public Requestmanager{
        Request storage request = requests[index];
        require(request.approvercount > approvercount /2);

        request.recipien.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns(uint,uint,uint,uint,address){
        return (mininumContribution,address(this).balance,requests.length,approvercount,manager);
    }

    function getRequestCount() public view returns(uint){
        return requests.length;
    }
}
