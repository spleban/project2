import React, { Component } from 'react';

export default class StepTwo extends Component {
 
  render() {
    return (
      <div className="form-blk">
        <div className="form-row">
          <label>Select provider:</label>
          <select name="provider" value={this.props.provider} onChange={this.props.handleChangeProvider} >
            <option value="">Select provider</option>
            {this.props.providers.map(provider => <option value={provider.id}>{provider.name}</option>)}
           </select>
        </div>
      </div>
    )
  }
}
