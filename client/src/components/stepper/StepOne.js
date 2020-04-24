import React, { Component } from 'react';
import { NavLink,Link } from "react-router-dom";


export default class StepOne extends Component {

  constructor(props) {
   super(props);
   
  };

  

  render() {
    return (
      <div className="form-blk">
        <div className="form-row">
          <label>Select service:</label>
          <select name="service" value={this.props.service} onChange={this.props.handleChangeService} >
            <option value="">Select service</option>
            <option value="spiderman ">Spiderman</option>
            <option value=" ">Batman</option>
            <option value=" ">Iron Man</option>
            <option value=" ">Architects</option>
          </select>
        </div>
      </div>
    )
  }
}
