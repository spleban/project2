import React, { Component } from 'react';
//import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component';
import './style.css';
import Header from '../../components/header/index.js';
import Footer from '../../components/footer/index.js';

export default class ProviderDashboard extends Component {
  
  constructor() {
   super();

   // this.state = {
      
   // }
   
   this.back = this.back.bind(this);
   
  };

  back() {
    this.props.history.push('/login');
  }
  
  

  render() {
    const data = [
      { id: 1, customer: "Batman ", date: " ", time: " " }, 
      { id: 2, customer: "Spiderman ", date: " ", time: " " },
      { id: 3, customer: "Ironman ", date: " ", time: " " },
      { id: 4, customer: "Thor ", date: " ", time: " " },
      { id: 5, customer: "Hulk ", date: " ", time: " " },
    ];
    const columns = [
      {
        name: 'Customer',
        selector: 'customer',
      },
      {
        name: 'Date',
        selector: 'date'
      },
      {
        name: 'Time',
        selector: 'time'
      },
      {
        name: 'Actions',
        center: true,
        cell: row => 
        <div className="table-btn">
          <a href="#"><i className="fa fa-trash-o" aria-hidden="true"></i></a>
        </div>
      }
    ];
    return (
      <div className="App main-outercon">
        <div className="page-wrap solid-bg">
          <Header></Header>
          <section className="content-container">
            <div className="page-container">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="dashboard-wrap">
                      <div className="dashboard-head">
                        <div className="dashboard-left">
                          <h4>Customers</h4>
                        </div>
                        <div className="dashboard-right">
                           <button className="btn-common grey-col" onClick={this.back}>Exit</button>
                        </div>
                      </div>
                      <div className="dashboard-content">
                        <DataTable columns={columns} data={data} />
                      </div>
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
