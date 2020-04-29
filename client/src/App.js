import React from 'react';
import {BrowserRouter as Router,Route,Switch,Redirect} from "react-router-dom";



// Pages
import HomePage from './containers/home/index.js';
import LoginPage from './containers/login/index.js';
import CustomerJoin from './containers/customer-join/index.js';
import ProviderJoin from './containers/provider-join/index.js';
import ProviderDashboard from './containers/provider-dashboard/index.js';
import CustomerDashboard from './containers/customer-dashboard/index.js';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/customer_join" component={CustomerJoin} />
        <Route exact path="/provider_join" component={ProviderJoin} />
        <Route exact path="/provider_dashboard" component={ProviderDashboard} />
        <Route exact path="/customer_dashboard" component={CustomerDashboard} />
        <Route exact path="/" component={HomePage} />
        <Redirect to="/" /> 
      </Switch>
    </Router>
  );
}

export default App;
