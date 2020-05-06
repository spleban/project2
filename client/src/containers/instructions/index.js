import React, { Component } from 'react';
import './style.css';

import Header from '../../components/header/index.js';
import Footer from '../../components/footer/index.js';

export default class InstructionsPage extends Component {
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
                    <div className="left-blk">
                      <div className="page-head">
                        <h3>Instructions</h3>
                        <p>This is a detailed layout on how to use the app, if you have any troubles at all.</p>
                        <p><strong>First: </strong><br /> Depending on if you are a Provider or a Customer follow these easy steps.</p>
                        <p><strong>Step 1: </strong><br />PROVIDER or CUSTOMER = If you want to sign up as a Provider or Customer just click on the Provider or Customer Join button.</p>
                        <p><strong>Step 2: </strong><br /> PROVIDER or CUSTOMER =  Then after you click the button its gonna direct you to the signup page, where you have to fill out the Provider or Customer information, and click the save button after you do.</p>
                        <p><strong>Step 3: </strong><br /> PROVIDER or CUSTOMER = Then you're gonna be directed to the Provider or Customer Dashboard (if you signed up as a customer please continue to step 4).</p>
                        <p><strong>Step 4: </strong><br /> CUSTOMER = Once you're at the Customer Dashboard you will see a New Sessions button, just click on the New Sessions button and a dropdown menu will popup, click on your session, then click on the Provider, then click on the date that's convient for you, finally click the time that's convient for you, and now you're ready to start booking your Appointments with your favorite Providers.</p>
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