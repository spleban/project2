import React, { Component } from 'react';
//import { NavLink,Link } from "react-router-dom";
import './style.css';

import Header from '../../components/header/index.js';
import Footer from '../../components/footer/index.js';
import axios from 'axios';


export default class ProviderJoin extends Component {
  
  constructor() {
   super();

   this.state = {
      fields: {
        name: '',
        email: '',
        service: '',
        slots: ''
      },
      errors: {},
   }
   
   this.handleChange = this.handleChange.bind(this);
   this.onSubmit = this.onSubmit.bind(this);
   this.back = this.back.bind(this);
   
  };


  handleChange(e) {
    //const target = e.target;
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
  }

  back() {
    this.props.history.push('/');
  }

  onSubmit = async e  => {
    e.preventDefault();
    if (this.validateForm()) {
      try {
        const { data } = await axios.post("/api/saveprovider", this.state.fields)
        console.log(data);
        console.log(data.error);
        if (data.error === undefined)
        {
             localStorage.setItem("provider",data[0]);
             this.props.history.push('/provider_dashboard');
         } else {
             alert(data.error);
             this.props.history.push('/provider_join');
           }  
         }
         catch (err) {
            alert(err);
            this.props.history.push('/provider_join');
         }
       }
    }
  

  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "*Please enter your name.";
    }

    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "*Please enter your email.";
    }

    if (!fields["service"]) {
      formIsValid = false;
      errors["service"] = "*Please enter service provided.";
    }

    if (!fields["slots"]) {
      formIsValid = false;
      errors["slots"] = "*Please enter your slots in a day.";
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
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
                          <h3>Provider Join</h3>
                          <p>Please provide your Full Name, Email, Services that you provide, And how many Services a day. Thanks.</p>
                        </div>
                        <div className="form-blk">
                          <form onSubmit={this.onSubmit}>
                            <div className="form-row">
                              <label>Full name:</label>
                              <input type="text" name="name" className="input-style" value={this.state.fields.name} onChange={this.handleChange} />
                              <div className="errorMsg">{this.state.errors.name}</div>
                            </div>
                            <div className="form-row">
                              <label>Email:</label>
                              <input type="email" name="email" className="input-style" value={this.state.fields.email} onChange={this.handleChange} />
                              <div className="errorMsg">{this.state.errors.email}</div>
                            </div>
                            <div className="form-row">
                              <label>Service:</label>
                              <input type="text" name="service" className="input-style" value={this.state.fields.service} onChange={this.handleChange} />
                              <div className="errorMsg">{this.state.errors.service}</div>
                            </div>
                            <div className="form-row">
                              <label>No.# services a day:</label>
                              <input type="text" name="slots" className="input-style" value={this.state.fields.slots} onChange={this.handleChange} />
                              <div className="errorMsg">{this.state.errors.slots}</div>
                            </div>
                            <div className="form-row btn-blk two-btns-blk">
                              <button className="btn-common grey-col" onClick={this.back}>Back</button>
                              <button className="btn-common" type="submit">Save</button>
                            </div>
                          </form>
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
