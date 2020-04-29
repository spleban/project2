import React, { Component } from 'react';
//import { NavLink,Link } from "react-router-dom";


export default class StepTwo extends Component {

  // constructor(props) {
  //  super(props);

   
  // };


  

  render() {
    return (
      <div className="form-blk">
        <div className="form-row">
          <label>Select provider:</label>
          <select name="provider" value={this.props.provider} onChange={this.props.handleChangeProvider} >
            <option value="">Select provider</option>
            <option value="Peter Parker">Peter Parker</option>
            <option value="Bruce Wayne ">Bruce Wayne</option>
            <option value="Tony Stark ">Tony Stark</option>
          </select>
        </div>
      </div>
    )
  }
}
