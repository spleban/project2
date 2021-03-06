import React, { Component } from 'react';
import './style.css';
import Axios from 'axios';
import Header from '../../components/header/index.js';
import Footer from '../../components/footer/index.js';

export default class Login extends Component {
  
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
   this.onClick = this.onClick.bind(this);
   this.getData = this.getData.bind(this);
   
  };

  getData = async (apiLogin,localStorageName,dashboard,fields) => {
    try {
      const { data } = await Axios.post(apiLogin, fields);
    
      if (data.error === undefined)
      {
        localStorage.setItem(localStorageName,JSON.stringify(data[0]));
        this.props.history.push(dashboard);
      } else {
        alert(data.error);
        this.props.history.push('/login');
      }  
         
    } catch (err) {
        alert(err);
        this.props.history.push('/login');
     }
  }

  handleChange(e) {
    const target = e.target;
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
  }

  
  onClick(e,login_type) {
    e.preventDefault();
    if (this.validateForm()) {
      if(login_type == 'provider_login'){
        this.getData('/api/providerlogin','provider','/provider_dashboard',this.state.fields);
        } else {
        this.getData('/api/customerlogin','customer','/customer_dashboard',this.state.fields);
      }
    }
  }


  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields['name']) {
      formIsValid = false;
      errors['name'] = '*Please enter your name.';
    }

    if (!fields['email']) {
      formIsValid = false;
      errors['email'] = '*Please enter your email.';
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
  }


  render() {

    return (
      <div className='App main-outercon'>
        <div className='page-wrap solid-bg'>
          <Header></Header>
          <section className='content-container'>
            <div className='page-container'>
              <div className='container'>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='left-blk'>
                        <div className='page-head'>
                          <h3>Login to Awesome Scheduling</h3>
                          <p>Please enter your Full Name and Email.</p>
                        </div>
                        <div className='form-blk'>
                          <form>
                            <div className='form-row'>
                              <label>Full name:</label>
                              <input type='text' name='name' className='input-style' value={this.state.fields.name} onChange={this.handleChange} />
                              <div className='errorMsg'>{this.state.errors.name}</div>
                            </div>
                            <div className='form-row'>
                              <label>Email:</label>
                              <input type='email' name='email' className='input-style' value={this.state.fields.email} onChange={this.handleChange} />
                              <div className='errorMsg'>{this.state.errors.email}</div>
                            </div>
                            <div className='form-row btn-blk two-btns-blk'>
                              <button className='btn-common' onClick={(e) => this.onClick(e,'provider_login')}>Provider</button>
                              <button className='btn-common' onClick={(e) => this.onClick(e,'customer_login')}>Customer</button>
                            </div>
                          </form>
                        </div>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='right-blk'>
                      <img src='images/schedule.jpg' alt='' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className='footer-push'></div>
        </div>
        <Footer></Footer>
      </div>
    )
  }
}



