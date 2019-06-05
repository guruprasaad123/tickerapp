import React,{Component} from 'react';
import {Row , Col , List ,Avatar, Typography ,Button, Skeleton ,Icon ,Modal, Tabs }from 'antd';
import axios from 'axios';

const TabPane = Tabs.TabPane;

interface Props{
[key:string]:any
}

interface State{
 
    [key:string]:any
}

function Readable_filings(data:any):any
{
  if(data.length > 0)
  {

  return  data.map( (dump:string,index:number)=>{
      const arr = dump.split('*');
       let date:any =arr[0],
       rate:string=arr[1],
       type:string=arr[2],
       form:string=arr[3],
       //none:string=arr[4],
       report:string=arr[5]+'-'+String(index),
       path:string=arr[6];
       const YY:string=date.slice(0,4);
       const MM:string=date.slice(4,6);
       const DD:string=date.slice(6,8);
      const url_part:string=path.split('-')[0].slice(4);
       date = new Date(`${YY}-${MM}-${DD}`)
       return {
         date,
         rate,
        type,
        form,
        report,
        path,
        url:`https://www.sec.gov/Archives/edgar/data/${url_part}/${path}`
       }
    })
  }
  
  return {};
}

//https://www.sec.gov/Archives/edgar/data/320193/000032019318000070/a10-qq220183312018.htm
class Dashboard extends Component<Props>{

    state:State ={
        data:[],
        loading:true,
        filings:[],

    }

    constructor(props:Props)
    {
        super(props);
        this.state={
            data:[{'name': 'Asia Automotive Acquisition Corp', 'id': '1332552#f'}],
            loading:true,
            filings:[]
        }
    }




    componentDidMount()
    {
    
      

    }
    handleOk = (e:any) => {
      console.log(e);
      this.setState({
        visible: false,
      });
    }
  
    handleCancel = (e:any) => {
      console.log(e);
      this.setState({
        visible: false,
      });
    }
  


    render()
    {
        const filings:any = Readable_filings(this.props.filings), loading:boolean = this.state.loading;
        const news : any = this.props.news;
        const results: any= this.props.results;
        return (<div style={{background:'white'}}>
            <Row type="flex" justify="center" align="middle" style={{height:'inherit'}}>
            <Typography.Title  type="secondary">
            DashBoard
            </Typography.Title>
            <Button onClick={this.props.toggleView} type="primary"> Back to Home </Button>
           <Col span={20} >
           <Tabs defaultActiveKey="1" >
    <TabPane tab="News" key="1">
    
    {
  /*

source": {
"id": null,
"name": "Firstpost.com"
},
"author": "Reuters",
"title": "Facebook planning to use cryptocurrency-based payment system for its global users",
"description": "Bitcoin and similar cryptocurrencies have been susceptible to wild fluctuations in value. The post Facebook planning to use cryptocurrency-based payment system for its global users appeared first on Firstpost.",
"url": "https://www.firstpost.com/tech/news-analysis/facebook-planning-to-use-cryptocurrency-based-payment-system-for-its-global-users-6573901.html",
"urlToImage": "https://images.firstpost.com/wp-content/uploads/2018/12/Facebook-720-Faceboom-1280.jpg",
"publishedAt": "2019-05-05T06:57:34Z",
"content": "ReutersMay 05, 2019 12:27:34 IST\r\nThe Wall Street Journal reports that Facebook plans a cryptocurrency-based payment system that it could launch for billions of users worldwide.\r\nFacebook. Reuters\r\nThe system would use a digital coin similar to bitcoin, but d… [+819 chars]"
}

   <List.Item
        key={item.title}
       // actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
        extra={<img width={272} alt="logo" src={item.urlToImage} />}
      >
        <List.Item.Meta
          avatar={<Icon type="file-done" />}
          title={<a href={item.url}>{item.title}</a>}
          description={item.description}
        />
        {item.content}
      </List.Item>

*/


<List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={news.articles}
    footer={<div><b>News</b> footer</div>}
    renderItem={(item:any) => (
      <List.Item
      key={item.title}
     // actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
      extra={<img width={272} alt="logo" src={item.urlToImage} />}
    >
      <List.Item.Meta
        avatar={<Avatar icon={'read'} />}
        title={<a href={item.url}>{item.title}</a>}
        description={item.source.name}
      />
      {item.content}
    </List.Item>
    )}
  />
}
    </TabPane>
    <TabPane tab="Quarterly Report" key="2">
    {  ( 
       <div>
    <h3 style={{ marginBottom: 16 }}>Quarterly reports</h3>

<List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={filings}
    footer={<div><b>Quarterly Report</b> footer</div>}
    renderItem={(item:any) => (
      <List.Item
        key={item.report}
        onClick={()=>{
          this.setState({
            visible:true,
            modalTitle:item.report,
            modalUrl:item.url
          });
        }}
       // actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
        extra={<iframe width={272}  src={item.url} />}
      >
        <List.Item.Meta
          avatar={<Avatar icon={'file-text'} />}
          title={<a href={item.url} target={'_blank'}>{item.report}</a>}
          description={'Type-'+item.type}
        />
        {item.path}
      </List.Item>
    )}
  />
    </div>
  )
    }
    
    </TabPane>
  
  </Tabs>
  <Modal
          title={this.state.modalTitle}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
     <iframe   src={this.state.modalUrl} ></iframe>
        </Modal>
           </Col>
           </Row>
            </div>);
    }

}

export default Dashboard;
