import React,{Component} from 'react';
import {Table,Button} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

class  RequestRow extends  Component{

onAgree = async()=>{
   const campaign = Campaign(this.props.address);
   const accounts = await web3.eth.getAccounts();
   await campaign.methods.approveRequest(this.props.id).send({from:accounts[0]});
}
onFinalze = async()=>{
   const campaign = Campaign(this.props.address);
   const accounts = await web3.eth.getAccounts();
   await campaign.methods.FinalzeRequest(this.props.id).send({from:accounts[0]});
}

   render(){
    console.log(this.props.address);
    const {id,request,approvercount} =this.props;
    const {Row,Cell} = Table;
     return (
       <Row disabled={request.complete}>
       <Cell>{this.props.id}</Cell>
       <Cell>{this.props.request.description}</Cell>
       <Cell>{web3.utils.fromWei(this.props.request.value,'ether')}</Cell>
       <Cell>{this.props.request.recipien}</Cell>
       <Cell>{this.props.request.approvercount} / {this.props.approvercount}</Cell>
       <Cell>
          {request.complete?null:( <Button color="green" onClick={this.onAgree}>同意</Button>)}
       </Cell>
       <Cell>
          {request.complete?null:( <Button color="teal" onClick={this.onFinalze}>完成</Button>)}
       </Cell>
       </Row>
     );
   }

}

export default RequestRow;
