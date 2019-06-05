import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Switch ,Redirect } from 'react-router-dom';
import Home from './home';
import Dashboard from './dashboard';

const Root:any = <Router>
            <Switch>         
                     <Route exact path="/" component={((props:any)=><Home {...props}/>) } />
                     <Route exact  path="/dashboard" component={ ()=>(<Dashboard/>) } />
                     <Route component={()=>(<Home/>)} />         
                     </Switch>
              </Router>;
 
export default Root;