import React, { Component } from 'react';
import './style.css';

import Header from '../../components/header/index.js';
import Footer from '../../components/footer/index.js';

export default class ContactPage extends Component {


  render() {
    return (
      <div className="App main-outercon">
        <div className="page-wrap content-pages">
          <Header></Header>
          <section className="content-container">
            <div className="page-container">
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <div className="left-blk contact-page">
                      <div className="page-head">
                        <h3>Contact Us</h3>
                        <p>If you have any questions reguarding this APP. Please feel free to contact us at any of the information thats provided on this page..Thank you.</p>
                      </div>
                      <div className="contact-form">
                        <div className="form-blk">
                          <div className='form-row'>
                            <label>CEO's:</label>
                            <p>Shlomo Pleban<br />Kevin Thomas</p>
                          </div>
                          <div className='form-row'>
                            <label>EMAIL:</label>
                            <p>berkeleycodingbootcamp@pbs.gov</p>
                          </div>
                          <div className='form-row'>
                            <label>PHONE:</label>
                            <p>1-800-BOOT-CAMP</p>
                          </div>
                          <div className='form-row'>
                            <label>Address:</label>
                            <p>UC Berkeley Extensions<br />2515 Hillegass Ave<br />Berkeley, CA. 94704</p>
                          </div>
                          <div className='form-row btn-blk'>
                          </div>
                        </div>
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