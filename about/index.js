import React, { Component } from 'react';
import './style.css';

import Header from '../../components/header/index.js';
import Footer from '../../components/footer/index.js';

export default class AboutPage extends Component {
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
                                                <h3>About Awesome Scheduling</h3>
                                                <p>Thank you for choosing Awesome Scheduling App, But first let me tell you a little about this app.</p>
                                                <p>This is the one stop shop for all the Provider and Customer needs, This is the perfect place where the perfect Customer looking for certain services can find the perfect Provider.</p>
                                                <p>This is a app where Providers that offer certain services such as programming, massages, tutoring, etc.. can offer their services with a specific time when they can provide them, and all the customer has to do is look for whatever services they're looking for and book the appointment with a few simple clicks of a button.</p>
                                                <p>This app keeps track of all the Providers, the services they provide, and the time slots showing the customer when they're available, as well as keeping track of the Customer, the services they picked, and the time slots of the services they chose.</p>
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