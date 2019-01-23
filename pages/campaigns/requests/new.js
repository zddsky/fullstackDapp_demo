import React,{Component} from 'react';
import {Form,Input, Message,Button } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import Layout from '../../../components/Layout';
import {Router,Link} from '../../../routes';


class  CampaignRequestNew extends Component {

   static async getInitialProps(props){
     const {address} =props.query;
     return {address};
   }

    state = {
      description:'',
      value:'',
      recipientAddress:'',
      errorMessage:'',
      loading:false
    };


    onSubmit= async() =>{
      event.preventDefault();
      const campaign = Campaign(this.props.address);
      const accounts = await web3.eth.getAccounts();
      const {description,value,recipientAddress}= this.state;
      this.setState({loading:true});

      try {
       await campaign.methods.CreateRequest(recipientAddress,description,web3.utils.toWei(this.state.value,'ether')).send({
        from:accounts[0]
      })
      Router.pushRoute(`/campaigns/${this.props.address}/requests`)

      }catch(error){
        this.setState({errorMessage:error.message});
     } this.setState({loading:false});
    }

    render() {
      return (
        <Layout>
        <Link route={`/campaigns/${this.props.address}/requests`}>
        <a>返回</a>
        </Link>
        <Form onSubmit={this.onSubmit} error ={!!this.state.errorMessage}>
         <Form.Field>
          <label>新请求的描述</label>
          <Input
          value ={this.state.description}
          onChange ={event=>this.setState({description:event.target.value})}
          />
         </Form.Field>

         <Form.Field>
          <label>请求的金额(ether)</label>
          <Input
          value ={this.state.value}
          onChange ={event=>this.setState({value:event.target.value})}
          />
         </Form.Field>

         <Form.Field>
          <label>受益人地址</label>
          <Input
          value ={this.state.recipientAddress}
          onChange ={event=>this.setState({recipientAddress:event.target.value})}
          />
         </Form.Field>

         <Message error header='错误信息' content={this.state.errorMessage} />
         <Button primary loading={this.state.loading}>新建请求</Button>
        </Form>

        </Layout>
      );
    }
}

export default CampaignRequestNew;
