import React,{Component} from 'react';
import web3 from '../../../ethereum/web3';
import { Card,Button,Table } from 'semantic-ui-react';
import { Router,Link } from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';


class  CampaignRequest extends Component {

  static async getInitialProps(props){
    const {address} =props.query;

    const campaign = Campaign(address);

    const requestCount = await campaign.methods.getRequestCount().call();
    const summary = await campaign.methods.getSummary().call();

    console.log(requestCount);


    const requests = await Promise.all(
      Array(parseInt(requestCount)).fill().map((element,index)=>{
        return campaign.methods.requests(index).call();
     })
    )
    console.log(summary);
    return {address,requests,summary};
  }


  renderRow(){
    return this.props.requests.map((request,index)=>{
      return(
        <RequestRow
        key={index}
        id= {index}
        request={request}
        address={this.props.address}
        approvercount ={this.props.summary[3]}
        >
        </RequestRow>
      );
    });
  }


  render() {

    const {HeaderCell,Row,Header}=Table;
    return (
  <Layout>
      <h1>请求列表</h1>
      <Link route={`/campaigns/${this.props.address}/requests/new`}>
      <Button primary>增加新的请求</Button>
      </Link>

      <Table>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.HeaderCell>描述</Table.HeaderCell>
        <Table.HeaderCell>请求的总金额</Table.HeaderCell>
        <Table.HeaderCell>受益人地址</Table.HeaderCell>
        <Table.HeaderCell>同意人数量</Table.HeaderCell>
        <Table.HeaderCell>是否同意</Table.HeaderCell>
        <Table.HeaderCell>是否完成</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
     {this.renderRow()}
    </Table.Body>

    </Table>

  </Layout>
    );
  }

}

export default CampaignRequest;
