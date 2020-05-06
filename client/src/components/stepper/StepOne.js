import React, { Component } from 'react';

export default class StepOne extends Component {

  render() {
    return (
      <div className="form-blk">
        <div className="form-row">
          <label>Select Service:</label>
          <select name="service" value={this.props.serviceName} onChange={this.props.handleChangeService} >
          <option value="">Service</option>
            {this.props.services.map((service, idx) => <option key={idx} value={service.id} name={service.name}>{service.name}</option>)}
          </select>
        </div>
      </div>
    )
  }
}
