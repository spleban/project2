import React, { Component } from 'react';

export default class StepOne extends Component {

  render() {
    return (
      <div className="form-blk">
        <div className="form-row">
          <label>Select service:</label>
          <select name="service" value={this.props.service} onChange={this.props.handleChangeService} >
          {this.props.services.map(service => <option value={service.id}>{service.name}</option>)}
          </select>
        </div>
      </div>
    )
  }
}
