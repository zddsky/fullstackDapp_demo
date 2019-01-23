import React,{Component} from 'react';
import {Form,Input,Button,Message} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import { Router } from '../routes';

class ContributeForm extends Component {
  state = {
    value:'',
    errorMessage:'',
    loading:false
  };

  onSubmit= async() =>{
    event.preventDefault();
    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();
    this.setState({loading:true});

    try {
     await campaign.methods.Contribute().send({
      from:accounts[0],
      value:web3.utils.toWei(this.state.value,'ether')
    })
     Router.replaceRoute(`/campaigns/${this.props.address}`)
    }catch(error){
      this.setState({errorMessage:error.message});
   } this.setState({loading:false});
  }


  render() {
    return (
      <Form onSubmit={this.onSubmit} error ={!!this.state.errorMessage}>
       <Form.Field>
        <label>总的投资额度</label>
        <Input
        value ={this.state.value}
        onChange ={event=>this.setState({value:event.target.value})}
        label="ether"
        labelPosition='right'
        />
       </Form.Field>
       <Message error header='错误信息' content={this.state.errorMessage} />
       <Button primary loading={this.state.loading}>投资</Button>
      </Form>
    );
  }
}

export default ContributeForm;
