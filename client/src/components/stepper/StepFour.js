import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default class StepFour extends Component {


render() {
  return (
    <div className="form-blk">
      <div className="form-row">
        <label>Select Slot:</label>
        <select name="slot" value={this.props.slot} onChange={this.props.handleChangeSlot} >
        <option value="">Slot</option>
          {this.props.slots.map((slot , idx) => <option key={idx} value={slot.slot}>{slot.slot}</option>)}
        </select>
      </div>
    </div>
  )
}
}
