import React, { Component } from 'react';
import { NavLink,Link } from "react-router-dom";
import './style.css';

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';



import Header from '../../components/header/index.js';
import Footer from '../../components/footer/index.js';

const localizer = momentLocalizer(moment)

export default class Home extends Component {
  
  constructor() {
   super();

   this.state = {
      
   }
   
   this.loginClick = this.loginClick.bind(this);
   this.customerJoin = this.customerJoin.bind(this);
   this.providerJoin = this.providerJoin.bind(this);
   
  };


  loginClick(){
    this.props.history.push('/login');
  }
  
  customerJoin(){
    this.props.history.push('/customer_join');
  }
  
  providerJoin(){
    this.props.history.push('/provider_join');
  }
  

  render() {

    return (
      <div className="App main-outercon">
        <div className="page-wrap solid-bg">
          <Header></Header>
          <section className="content-container">
            <div className="page-container">
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <div className="left-blk">
                       <div className="page-head">
                         <h3>Welcome to Awesome Scheduling</h3>
                         <p>A place where Scheduling an Appointment is as easy as saying your ABC's and counting your 123's.</p>
                       </div>
                       <div className="btn-wrap">
                         <button className="btn-common" onClick={this.loginClick}>Login</button>
                         <button className="btn-common" onClick={this.providerJoin}>Provider Join</button>
                         <button className="btn-common" onClick={this.customerJoin}>Customer Join</button>
                       </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="right-blk">
                      <img src="images/schedule.jpg" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="footer-push"></div>
        </div>
        <Footer></Footer>
      </div>
    )
  }
}
