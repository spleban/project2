import React, { Component } from 'react';
import './style.css';

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer-container">
        <div className="container">
            <div className="row">
              <div className="col-md-12">
                  <div className="footer-wrap">
                    <p>&copy; 2020 Awesome schedule</p>
                  </div>
              </div>
            </div>
        </div>
      </footer>
    )
  }
}
