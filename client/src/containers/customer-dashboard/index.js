import React, { Component } from 'react';
import { NavLink,Link } from "react-router-dom";
import DataTable from 'react-data-table-component';
import { Modal } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './style.css';
import moment from 'moment';


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
      data: {
        service: '',
        provider: '',
        date_time: '',
      },
      service: '',  
      provider: '',
      date: '',
      time: '',
      stepperError: ''

   }
   
   this.back = this.back.bind(this);
   this.popupOpen = this.popupOpen.bind(this);
   this.popupClose = this.popupClose.bind(this);
   this.handleChangeService = this.handleChangeService.bind(this);
   this.handleChangeProvider = this.handleChangeProvider.bind(this);
   this.handleChangeDate = this.handleChangeDate.bind(this);
   this.handleChangeTime = this.handleChangeTime.bind(this);
   this.sessionSave = this.sessionSave.bind(this);
   
   
   
  };


  handleChangeService = (e) => {
    this.setState({ 
      service: e.target.value
    });  
  };

  handleChangeProvider = (e) => {
    this.setState({ 
      provider: e.target.value
    });  
  };

  handleChangeDate = (val,field_name) => {
    this.state.date=val
    this.setState({ 
        date: this.state.date
    });  
  };

  handleChangeTime = (val,field_name) => {
    this.state.time=val
    this.setState({ 
        time: this.state.time
    });  
  };

  back() {
    this.props.history.push('/login');
  }
  
  popupOpen(){
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
      time: ''
    });
  } 


  sessionSave(e){
    e.preventDefault();
    let service = this.state.service;
    let provider = this.state.provider;
    let date = moment(new Date(this.state.date)).format("YYYY-MM-DD");
    let time = moment(new Date(this.state.time)).format("hh:mm a");
    console.log('New session data:')
    console.log(service)
    console.log(provider)
    console.log(date)
    console.log(time)
    this.popupClose();
  }

  
  

  render() {

    let session_data = {
      'service': this.state.service,
      'provider': this.state.provider,
      'date': moment(new Date(this.state.date)).format("YYYY-MM-DD"),
      'time': moment(new Date(this.state.time)).format("hh:mm a")
    }

    const steps = [
      {name: 'StepOne', component: <StepOne service={this.state.service} handleChangeService={this.handleChangeService} />},
      {name: 'StepTwo', component: <StepTwo provider={this.state.provider} handleChangeProvider={this.handleChangeProvider} />},
      {name: 'StepThree', component: <StepThree date={this.state.date} handleChangeDate={this.handleChangeDate} />},
      {name: 'StepFour', component: <StepFour time={this.state.time} handleChangeTime={this.handleChangeTime} />}
    ];


    const data = [
      { id: 1, provider: 'Batman ', service: 'utility belt ', date: ' ', time: ' ' }, 
      { id: 2, provider: 'Spiderman', service: 'spider webs ', date: ' ', time: ' ' },
      { id: 3, provider: 'Ironman ', service: 'weapons ', date: ' ', time: ' ' },
      { id: 4, provider: 'Thor ', service: 'god ', date: ' ', time: ' ' },
      { id: 5, provider: 'Hulk ', service: 'smashing ', date: ' ', time: ' ' },
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
        name: 'Time',
        selector: 'time'
      },
      {
        name: 'Actions',
        center: true,
        cell: row => 
        <div className="table-btn">
          <a href="#"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
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
                  { ((this.state.service != '') && (this.state.provider != '') && (this.state.date != '') && (this.state.time != '')) ?  <button className="btn-common" onClick={this.sessionSave}>Save</button> : '' } 
                </div>
                { (this.state.service != '') ?
                  <div className="stepper-data">
                    { (this.state.service != '') ?  <span>Service: {session_data.service}</span> : '' } 
                    { (this.state.provider != '') ?  <span>Provider: {session_data.provider}</span> : '' } 
                    { (this.state.date != '') ?  <span>Date: {session_data.date}</span> : '' } 
                    { (this.state.time != '') ?  <span>Time: {session_data.time}</span> : '' } 
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
