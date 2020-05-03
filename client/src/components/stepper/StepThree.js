import React, { Component } from 'react';
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import subDays from "date-fns/subDays";


export default class StepThree extends Component {

  
//   render() {
//     return (
//       <div className="form-blk">
//         <div className="form-row">
//           <label>Select date:</label>
//           <DatePicker onChange={(value) =>  {this.props.handleChangeDate(value,'date')}} selected={this.props.date}
//           name="date" dateFormat="yyyy/MM/dd" showMonthDropdown minDate={subDays(new Date(), 0)} selectsStart
//           showYearDropdown
//           dropdownMode="select" 
//           placeholderText="Select date"
//           className="date-input" required />
//         </div>
//       </div>
//     )
//   }
// }

render() {
  return (
    <div className="form-blk">
      <div className="form-row">
        <label>Select Service Date:</label>
        <select name="date" value={this.props.date} onChange={this.props.handleChangeDate} >
          <option value="">Date</option>
          {this.props.dates.map((d , idx) => <option key={idx} value={d.date}>{d.dateDisplay}</option>)}
         </select>
      </div>
    </div>
  )
}
}
