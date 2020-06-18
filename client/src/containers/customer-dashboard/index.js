import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import { Modal } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import './style.css';
import axios from 'axios';
import MultiStep from 'react-multistep';

import Header from '../../components/header/index.js';
import Footer from '../../components/footer/index.js';
import StepOne from '../../components/stepper/StepOne'
import StepTwo from '../../components/stepper/StepTwo'
import StepThree from '../../components/stepper/StepThree'
import StepFour from '../../components/stepper/StepFour'


export default class CustomerDashboard extends Component {

  constructor() {
    super();

    this.state = {
      popupShow: false,
      customerName: '',
      serviceName: '',
      providerName: '',
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
        { id: 0, provider: 'Provider ', service: 'Service ', date: 'Date ', slot: 'Slot ' }
      ]

    }

    this.back = this.back.bind(this);
    this.popupOpen = this.popupOpen.bind(this);
    this.popupClose = this.popupClose.bind(this);
    this.handleChangeService = this.handleChangeService.bind(this);
    this.handleChangeProvider = this.handleChangeProvider.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeSlot = this.handleChangeSlot.bind(this);
    this.sessionSave = this.sessionSave.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  };

  componentDidMount() {
    this.getSessions();
    this.getServices();
  }

  async getServices() {
    try {
      const { data } = await axios.get("/api/getservices");
      if (data.error === undefined) {
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
    try {
      const customer = JSON.parse(localStorage.getItem("customer"));

      this.setState({
        customerId: customer.id
      })
      const { data } = await axios.post("/api/getcustomersessions", { customerId: customer.id });
      if (data.error === undefined) {
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

  handleChangeService = async (e) => {
    try {
      const serviceId = e.target.value;
      const index = e.nativeEvent.target.selectedIndex;
      const serviceName = e.nativeEvent.target[index].text;
     
      const { data } = await axios.post("/api/getserviceproviders", { serviceId: serviceId });
      if (data.error === undefined) {
        this.setState({
          serviceId: serviceId,
          serviceName: serviceName,
          providers: data
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

  handleChangeProvider = async (e) => {
    try {
      const providerId = e.target.value;
      const index = e.nativeEvent.target.selectedIndex;
      const providerName = e.nativeEvent.target[index].text;
      const { data } = await axios.post("/api/getproviderdates", { providerId: providerId });
      if (data.error === undefined) {
        this.setState({
          providerId: providerId,
          providerName: providerName,
          dates: data
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

  handleChangeDate = async (e) => {
    try {
      
      const date = e.target.value;
      const { data } = await axios.post("/api/getproviderslots",
        { providerId: this.state.providerId, date: date });
      if (data.error === undefined) {
        this.setState({
          date: date,
          slots: data
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

  handleChangeSlot = async (e) => {
    try {
      const slot = e.target.value;
      this.setState({
        slot: slot
      });
    } catch (err) {
      console.log(err);
    }
  }


  back() {
    this.props.history.push('/login');
  }

  popupOpen = async () => {
    this.setState({
      popupShow: true
    });
  }

  popupClose() {
    this.setState({
      popupShow: false,
      serviceName: '',
      serviceId: '',
      providerName: '',
      provideId: '',
      date: '',
      slot: ''
    });
    this.getSessions();
  }

  sessionSave = async (e) => {
    e.preventDefault();
    try {
      const customer = JSON.parse(localStorage.getItem("customer"));
      
      const { data } = await axios.post("/api/savesession",
        {
          customerId: this.state.customerId,
          providerId: this.state.providerId,
          serviceId: this.state.serviceId,
          date: this.state.date,
          slot: this.state.slot
        });
    } catch (err) {
      console.log(err);
    }

    this.popupClose();
  }


  handleDeleteClick = async data => {
    try {
      const res = await axios.delete('/api/deletesession', { data: { sessionId: data.id } });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    this.getSessions();
  }


  render() {
    let session_data = {
      'service': this.state.serviceName,
      'provider': this.state.providerName,
      'date': this.state.date,
      'slot': this.state.slot,
    }

    const steps = [
      { name: 'StepOne', component: <StepOne service={this.state.serviceName} services={this.state.services} handleChangeService={this.handleChangeService} /> },
      { name: 'StepTwo', component: <StepTwo provider={this.state.providerName} providers={this.state.providers} handleChangeProvider={this.handleChangeProvider} /> },
      { name: 'StepThree', component: <StepThree date={this.state.date} dates={this.state.dates} handleChangeDate={this.handleChangeDate} /> },
      { name: 'StepFour', component: <StepFour slot={this.state.slot} slots={this.state.slots} handleChangeSlot={this.handleChangeSlot} /> }
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
        cell: row => {
          return (
            <div className="table-btn" onClick={() => this.handleDeleteClick(row)}>
              <a href="#"><i className="fa fa-trash-o" aria-hidden="true"></i></a>
            </div>
          )
        }
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
                            <h4>My Sessions</h4>
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
                  {((this.state.serviceName !== '') && (this.state.providerName !== '') && (this.state.date !== '') && (this.state.slot !== '')) ? <button className="btn-common" onClick={this.sessionSave}>Save</button> : ''}
                </div>

                <div className="stepper-data">
                  {(this.state.serviceName !== '') ? <span>Service: {session_data.service}</span> : <span></span>}
                  {(this.state.providerName !== '') ? <span>Provider: {session_data.provider}</span> : <span></span>}
                  {(this.state.date !== '') ? <span>Date: {session_data.date}</span> : <span></span>}
                  {(this.state.slot !== '') ? <span>Slot: {session_data.slot}</span> : <span></span>}
                </div>

              </div>
              <button className="close-btn" onClick={this.popupClose}>X</button>
            </div>
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

