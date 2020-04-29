import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './style.css';

export default class Header extends Component {
  
  constructor(props) {    
    super(props)
    this.state = {
      isToggleOn: false
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
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/">About</Link></li>
                    <li><Link to="/">Contact</Link></li>
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
