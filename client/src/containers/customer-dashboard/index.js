import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component';
import { Modal } from 'react-bootstrap';
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './style.css';
import moment from 'moment';
import axios from 'axios';
import Header from '../../components/header/index.js';
import Footer from '../../components/footer/index.js';

import StepOne from '../../components/stepper/StepOne'
import StepTwo from '../../components/stepper/StepTwo'
import StepThree from '../../components/stepper/StepThree'
import StepFour from '../../components/stepper/StepFour'
import MultiStep from 'react-multistep';

export default class CustomerDashboard extends Component {
  
  constructor() {
   super();

   this.state = {
      popupShow: false,
      
      customerId: '',
      serviceId: '',  
      providerId: '',
      date: '',
      slot: '',
      
      stepperError: '',
      services: [],
      providers: [],
      dates: [],
      slots: [],
      sessionData: [
        { id: 1, provider: 'Batman ', service: 'utility belt ', date: ' ', slot: ' ' }, 
        { id: 2, provider: 'Spiderman', service: 'spider webs ', date: ' ', slot: ' ' },
        { id: 3, provider: 'Ironman ', service: 'weapons ', date: ' ', slot: ' ' },
        { id: 4, provider: 'Thor ', service: 'god ', date: ' ', slot: ' ' },
        { id: 5, provider: 'Hulk ', service: 'smashing ', date: ' ', slot: ' ' },
      ]

   }
   
   this.back = this.back.bind(this);
   this.popupOpen = this.popupOpen.bind(this);
   this.popupClose = this.popupClose.bind(this);
   this.handleChangeService = this.handleChangeService.bind(this);
   this.handleChangeProvider = this.handleChangeProvider.bind(this);
   this.handleChangeDate = this.handleChangeDate.bind(this);
   this.handleChangeslot = this.handleChangeslot.bind(this);
   this.sessionSave = this.sessionSave.bind(this);
     
  };

  componentDidMount() {
    this.getSessions();
    this.getServices();
  }

  async getServices() {
    try{
      const { data } = await axios.get("/api/getservices");
       if (data.error === undefined)
       {
           this.setState({
           services: data
         });
       } else {
         console.log(data.error);
         this.props.history.push('/customer_dashboard');
       }
     }
     catch (err) {
        console.log(err);
        this.props.history.push('/customer_dashboard');
     } 
   }
 
  
  async getSessions() {
    try{
      const customer = JSON.parse(localStorage.getItem("customer"));
      const customerId = customer.id;
      this.setState({
        customerId: customerId
      }); 
      const { data } = await axios.post("/api/getcustomersessions",{customerId: customerId});
       if (data.error === undefined)
       {
           this.setState({
           sessionData: data
         });
       } else {
         console.log(data.error);
         this.props.history.push('/customer_dashboard');
       }
     }
      catch (err) {
         console.log(err);
         this.props.history.push('/customer_dashboard');
      } 
    
  }
 

  async getProviders() {
    try{
      const serviceId = JSON.parse(localStorage.getItem("serviceId"));
      const { data } = await axios.post("/api/getserviceproviders",{serviceId: serviceId});
       if (data.error === undefined)
       {
           this.setState({
           providers: data
         });
       } else {
         console.log(data.error);
         this.props.history.push('/customer_dashboard');
       }
     }
      catch (err) {
         console.log(err);
         this.props.history.push('/customer_dashboard');
      } 
    
  }
 

  handleChangeService = async (e) => {
    try{
      const { data } = await axios.post("/api/getserviceproviders",e.target.value);
       if (data.error === undefined)
       {
         localStorage.setItem("sessionProviders",JSON.stringify(data));
         console.log(JSON.parse(localStorage.getItem("serviceProviders")));
         this.setState({ 
          serviceId: e.target.value
        }); 
       } else {
         console.log(data.error);
         this.setState({
          popupShow: true
        });
       }
     }
     catch (err) {
        console.log(err);
        this.setState({
          popupShow: true
        });
     } 
  
     
  };

  handleChangeProvider = (e) => {
    this.setState({ 
      provider: e.target.value
    });  
  };

  handleChangeDate = (val,field_name) => {
    this.setState({ 
        date: val
    });  
  };

  handleChangeslot = (val,field_name) => {
    this.setState({ 
        slot: val
    });  
  };

  back() {
    this.props.history.push('/login');
  }
  
  popupOpen = async () => {
    console.log('in popup open');
           this.setState({
           popupShow: true
         });
  } 

  popupClose(){
    this.setState({ 
      popupShow: false,
      service: '',  
      provider: '',
      date: '',
      slot: ''
    });
  } 


  sessionSave(e){
    e.preventDefault();
    let service = this.state.service;
    let provider = this.state.provider;
    let date = moment(new Date(this.state.date)).format("YYYY-MM-DD");
    let slot = this.state.slot;
    console.log('New session data:')
    console.log(service)
    console.log(provider)
    console.log(date)
    console.log(slot)
    this.popupClose();
  }
  

  render() {

    let session_data = {
      'service': this.state.serviceId,
      'provider': this.state.providerId,
      'date': moment(new Date(this.state.date)).format("YYYY-MM-DD"),
      'slot': this.state.slot,
    }

    const steps = [
      {name: 'StepOne', component: <StepOne service={this.state.service} services={this.state.services} handleChangeService={this.handleChangeService} />},
      {name: 'StepTwo', component: <StepTwo provider={this.state.provider} providers={this.state.providers} handleChangeProvider={this.handleChangeProvider} />},
      {name: 'StepThree', component: <StepThree date={this.state.date} handleChangeDate={this.handleChangeDate} />},
      {name: 'StepFour', component: <StepFour slot={this.state.slot} handleChangeslot={this.handleChangeslot} />}
    ];

    
    const columns = [
      {
        name: 'Provider',
        selector: 'provider',
      },
      {
        name: 'Service',
        selector: 'service',
      },
      {
        name: 'Date',
        selector: 'date'
      },
      {
        name: 'Slot',
        selector: 'slot'
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
      <>
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
                          <h4>My Schedules</h4>
                        </div>
                        <div className="dashboard-right">
                           <button className="btn-common" onClick={this.popupOpen}>New Session</button>
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

      <Modal className="popup-wrap" show={this.state.popupShow} onHide={this.popupClose} aria-labelledby="contained-modal-title-vcenter" centered> 
          <Modal.Body>
            <div className="popup-out">
              <div className="popup-head">
                <h4>New Session</h4>
              </div>
              <div className="popup-content">
                <div className="stepper-wrap">
                  <MultiStep steps={steps} />
                </div>
                <div className="stepper-btn">
                  { ((this.state.service !=='') && (this.state.provider !=='') && (this.state.date !=='') && (this.state.slot !=='')) ?  <button className="btn-common" onClick={this.sessionSave}>Save</button> : '' } 
                </div>
                { (this.state.service !=='') ?
                  <div className="stepper-data">
                    { (this.state.service !=='') ?  <span>Service: {session_data.service}</span> : '' } 
                    { (this.state.provider !=='') ?  <span>Provider: {session_data.provider}</span> : '' } 
                    { (this.state.date !=='') ?  <span>Date: {session_data.date}</span> : '' } 
                    { (this.state.slot !=='') ?  <span>Slot: {session_data.slot}</span> : '' } 
                  </div>
                : ''
                }
              </div>
              <button className="close-btn" onClick={this.popupClose}>X</button>
            </div>
          </Modal.Body>
        </Modal>
        </>
    )
  }
}

