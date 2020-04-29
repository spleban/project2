import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default class StepFour extends Component {

  // constructor(props) {
  //  super(props);

   
  // };

  

  render() {
    return (
      <div className="form-blk">
        <div className="form-row">
          <label>Select time:</label>
          <DatePicker
          selected={this.props.time}
          onChange={(value) =>  {this.props.handleChangeTime(value,'time')}}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeCaption="Time"
          dateFormat="h:mm aa" placeholderText="Select time"
        />
        </div>
      </div>
    )
  }
}
