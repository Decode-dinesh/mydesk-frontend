import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Layout from './layout';
import Login from './login';
import Tickets from './tickets';
import Signup from './signup';
import ProtectedRoute from './protectedRoute';
import Customer from './customer'
import CreateTicket from './createTicket';
import Agents from './components/AgentPage/agents';


const Navigation = () =>{

return (
    <div>      
        <Router>
        <div>
            <Switch>
            
                    <Route path="/" exact component={Login}></Route>
                    <Route path="/createTicket" exact component={CreateTicket}></Route>
                    <ProtectedRoute path="/tickets" exact component={Tickets}></ProtectedRoute>
                    <Route path="/register" exact component={Signup}></Route>
                    <ProtectedRoute path="/layout" exact  component={Layout} ></ProtectedRoute>
                    <ProtectedRoute path="/customer" exact component={Customer}></ProtectedRoute>
                    <ProtectedRoute path="/agents" exact  component={Agents}></ProtectedRoute>
            
            </Switch>
        </div>
    </Router>
    </div>
    
)
}

export default Navigation;