import React, { Component } from 'react';
import './style.css';
import Header from '../../components/header/index.js';
import Footer from '../../components/footer/index.js';
import axios from 'axios';

export default class CustomerJoin extends Component {
  
  constructor() {
   super();

   this.state = {
      fields: {
        name: '',
        email: '',
      },
      errors: {},
   }
   
   this.handleChange = this.handleChange.bind(this);
   this.onSubmit = this.onSubmit.bind(this);
   this.back = this.back.bind(this);
   };

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
  }

  back() {
    this.props.history.push('/');
  }

  onSubmit(e) {
    e.preventDefault();
        
    if (this.validateForm()) {
      axios.post("/api/savecustomer", this.state.fields)
        .then(res => {
                 
          if (res.data.error === undefined)
          {
            localStorage.setItem("customer",res.data[0]);
                        
            this.props.history.push('/customer_dashboard');
          } else {
            alert(res.data.error);
            this.props.history.push('/customer_join');
          }  
        }, (err) =>{
           alert(err.error);
           this.props.history.push('/customer_join');
        }
      )
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
                          <h3>Customer Join</h3>
                          <p>Please provide your Full Name, and Email. Thanks.</p>
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
