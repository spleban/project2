import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './style.css';

export default class Header extends Component {
  
  constructor(props) {    
    super(props)
    this.state = {
      path_name: window.location.pathname
    }
    
  }

  componentDidMount(){
    
  }
  

  render() {
    return (
      <header className="header-container">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="header-block">
                <div className="logo-blk">
                  <Link to="/">Awesome Scheduling</Link>
                </div>
                <div className="menu-blk">
                  <ul>
                    <li><Link className={`${this.state.path_name == "/"}` } to="/">Home</Link></li>
                    <li><Link className={`${this.state.path_name == "/about"}` } to="/about">About</Link></li>
                    <li><Link className={`${this.state.path_name == "/instructions"}` } to="/instructions">Instructions</Link></li>
                    <li><Link className={`${this.state.path_name == "/contact"}` } to="/contact">Contact</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }
}
