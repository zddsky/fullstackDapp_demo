import React,{Component} from 'react';
import factory from '../ethereum/factory'
import { Card,Button } from 'semantic-ui-react'
import Layout from '../components/Layout';
import { Link } from '../routes';

// export default()=>{
//   return <h1>new dao</h1>;
// }


class Campaignindex extends Component {

static async getInitialProps(){
  const campaign = await factory.methods.getDeployedCampaign().call();
  return {campaign};
}
   // async componentDidMount(){
   //   const campaign = factory.methods.getDeployedCampaign().call();
   //   // const campaign = factory.options.address;
   //   console.log(campaign);
   // }

   renderCampign(){
    const items =  this.props.campaign.map(address=>{
        return{
          header:address,
          description:<Link route = {`/campaigns/${address}`}><a>查看众筹</a></Link>,
          fluid:true
        }
      });
      return <Card.Group items={items} />;
  }


  render() {
     return (
      <Layout>
       <div>
       <h3>众筹列表</h3>
       <Link route = "/campaigns/new">
       <a>
       <Button primary floated="right" content='创建列表' icon='add' labelPosition='right' />
       </a>
       </Link>
          {this.renderCampign()}
       </div>
      </Layout>
     );
    // return <div>{this.props.campaign[0]}</div>;
  }
}


export default Campaignindex;
