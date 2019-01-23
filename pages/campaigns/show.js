import React from 'react';
import Layout from '../../components/Layout';
import ContributeForm from '../../components/contributeForm';
import Campaign from '../../ethereum/campaign';
import {Card,Grid,Button} from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes';

class  Campaignshow extends React.Component {

  static async getInitialProps(props){
    // console.log(props.query.address);
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    // console.log(summary);
    return{
         address:props.query.address,
         mininumContribution:summary[0],
         balance:summary[1],
         requestcount:summary[2],
         approvercount:summary[3],
         manager:summary[4]
    };
  }

  renderCard(){
    const{
      address,
      mininumContribution,
      balance,
      requestcount,
      approvercount,
      manager
    } = this.props;

    const items = [
      {
       header:manager,
       meta:'管理员地址',
       description:'当前管理者创建了众筹列表，并且是众筹受益人',
       style:{overflowWrap:'break-word'}
    },
    {
     header:mininumContribution,
     meta:'最小贡献量',
     description:'当前合约最低的投资起点',
     style:{overflowWrap:'break-word'}
    },
    {
     header:requestcount,
     meta:'请求任务数',
     description:'当前请求有多少个请求',
     style:{overflowWrap:'break-word'}
    },
    {
     header:approvercount,
     meta:'投资人数量',
     description:'当前众筹投资的人数',
     style:{overflowWrap:'break-word'}
   },
   {
    header:web3.utils.fromWei(balance,'ether'),
    meta:'众筹金额的余额(ether)',
    description:'当前众筹剩余金额',
    style:{overflowWrap:'break-word'}
   }
  ];
    return <Card.Group items={items}/>


  }





  render() {
    const summary = this.props.summary;

    return (
      <Layout>
       <h1>众筹显示</h1>
       <Grid>

        <Grid.Row>
        <Grid.Column width={10}>
         {this.renderCard()}
        </Grid.Column>


        <Grid.Column width={6}>
        <ContributeForm address={this.props.address}/>
        </Grid.Column>
        </Grid.Row>

        <Grid.Row>
        <Grid.Column width={10}>
          <Link route ={`/campaigns/${this.props.address}/requests`}>
          <a>
          <Button primary>查看请求</Button>
          </a>
          </Link>
        </Grid.Column>
        </Grid.Row>

       </Grid>
      </Layout>
    )
  }
}

export default Campaignshow;
