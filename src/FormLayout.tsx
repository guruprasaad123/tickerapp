import React,{Component} from 'react';
import {
    Form, Icon, Input, Button,
  } from 'antd';
import axios from 'axios';
import { FormComponentProps } from 'antd/lib/form';

  function hasErrors(fieldsError:any) {
    return Object.keys(fieldsError).some((field:string)=>(fieldsError[field]));
  }
  
  interface Props extends FormComponentProps {
      form:any,
      switch:any,
      toggle:any,
      error:any
  }

  class FormLayout extends React.Component<Props> {

    constructor(props:Props)
    {
        super(props);
    }

    componentDidMount() {
      // To disabled submit button at the beginning.
      this.props.form.validateFields();
     // this.fetchFilings('1332552');
    }
  
    toDashboard= ()=>{
    //    this.props.history.push('/dashboard');
    }

    handleSubmit = (e:Event) => {
      e.preventDefault();
      this.props.form.validateFields((err:any, values:any) => {
        if (!err) {
          console.log('Received values of form: ', values);
            const {CompanyName,TickerName} = values;
          axios.post('/api', 
            {
                CompanyName,
                TickerName
            }
          )
          .then( (response) =>{
            console.log(response);
            const filings:any = response.data.filings || [];
            const news: any = response.data.news || [];
            const results : any = response.data.results || [];
          // const filtered_filings:Object=filings.filter((str:string)=>str.split('*')[2]==='Q')
           this.setState({
            loading:false
           },()=>{
               this.props.switch({
                   filings,
                   news,
                   results
               })
           });
          //  this.fetchFilings('1332552');
           // this.props.history.push('/dashboard',{data:response.data});
          })
          .catch((error)=> {
            console.log(error.message);
            this.props.error(error.message);
          });
        }
      });
    }
  
    render() {
      const {
        getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
      } = this.props.form;
  
      // Only show error after a field is touched.
      const CompanyNameError = isFieldTouched('CompanyName') && getFieldError('CompanyName');
      const TickerNameError = isFieldTouched('TickerName') && getFieldError('TickerName');
      return (
        <Form layout="horizontal" onSubmit={(e:any)=>this.handleSubmit(e)}>
          <Form.Item
            validateStatus={CompanyNameError ? 'error' : ''}
            help={CompanyNameError || ''}
          >
            {getFieldDecorator('CompanyName', {
              rules: [{ required: true, message: 'Please input your CompanyName!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="CompanyName" />
            )}
          </Form.Item>
          <Form.Item
            validateStatus={TickerNameError ? 'error' : ''}
            help={TickerNameError || ''}
          >
            {getFieldDecorator('TickerName', {
              rules: [{ required: true, message: 'Please input your TickerName!' }],
            })(
              <Input prefix={<Icon type="profile" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="TickerName" />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
             Submit
            </Button>
          </Form.Item>
        </Form>
      );
    }
  }
  
  const WrappedForm = Form.create<Props>({ name: 'horizontal_login' })(FormLayout);
export default WrappedForm;