import React, { Component } from 'react';
//import { NavLink,Link } from "react-router-dom";

export default class StepOne extends Component {

  // constructor(props) {
  //  super(props);
   
  // };

  populateServices() {
    const options = localStorage.serviceOptions;
    for (let i = 0; i < options.length; i++){

    }

  }

  renderOptions() {
    this.props.services.map(service => <option value={service.id}>{service.name}</option>)
  }

  render() {
    return (
      <div className="form-blk">
        <div className="form-row">
          <label>Select service:</label>
          <select name="service" value={this.props.service} onChange={this.props.handleChangeService} >
            {this.props.services.map(service => <option value={service.id}>{service.name}</option>)}
            {/* <option value="">Select service</option>
            <option value="Spiderman ">Spiderman</option>
            <option value="Batman ">Batman</option>
            <option value="Ironman ">Iron Man</option>
            <option value="Hulk ">Hulk</option> */}
          </select>
        </div>
      </div>
    )
  }
}
