import React, { Component } from 'react';
//import { NavLink,Link } from "react-router-dom";


export default class StepOne extends Component {

  // constructor(props) {
  //  super(props);
   
  // };

  

  render() {
    return (
      <div className="form-blk">
        <div className="form-row">
          <label>Select service:</label>
          <select name="service" value={this.props.service} onChange={this.props.handleChangeService} >
            <option value="">Select service</option>
            <option value="Spiderman ">Spiderman</option>
            <option value="Batman ">Batman</option>
            <option value="Ironman ">Iron Man</option>
            <option value="Hulk ">Hulk</option>
          </select>
        </div>
      </div>
    )
  }
}
