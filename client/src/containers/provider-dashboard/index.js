import React, { Component } from 'react';
//import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component';
import './style.css';
import Header from '../../components/header/index.js';
import Footer from '../../components/footer/index.js';
import axios from 'axios';
export default class ProviderDashboard extends Component {
  
  constructor() {
   super();

    this.state = {
      sessionData: [
        { id: 1, customer: "Batman ", date: " ", time: " " }, 
        { id: 2, customer: "Spiderman ", date: " ", time: " " },
        { id: 3, customer: "Ironman ", date: " ", time: " " },
        { id: 4, customer: "Thor ", date: " ", time: " " },
        { id: 5, customer: "Hulk ", date: " ", time: " " },
      ]
      
    }
   
   this.back = this.back.bind(this);
   this.handleDeleteClick = this.handleDeleteClick.bind(this);

  };

  componentDidMount() {
    this.getSessions();
  }

  async getSessions() {
    try{
      const provider = JSON.parse(localStorage.getItem("provider"));
      const providerId = provider.id; 
      const { data } = await axios.post("/api/getprovidersessions",{providerId: providerId});
       if (data.error === undefined)
       {
           this.setState({
           sessionData: data
         });
       } else {
         console.log(data.error);
         this.props.history.push('/provider_dashboard');
       }
     }
      catch (err) {
         console.log(err);
         this.props.history.push('/provider_dashboard');
      } 
  }
 
  back() {
    this.props.history.push('/login');
  }
  
  handleDeleteClick = async data => {
    try {
      console.log(`sessionId ${data.id}`);
      const res = await axios.delete('/api/deletesession', { data: { sessionId : data.id}});
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    this.getSessions();
  }
  

  render() {
    
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
        cell: row => {
          return (
            <div className="table-btn" onClick={ () => this.handleDeleteClick(row)}>
            <a href="#"><i className="fa fa-trash-o" aria-hidden="true"></i></a>
          </div>
          )
        }
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
                        <DataTable columns={columns} data={this.state.sessionData} />
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
