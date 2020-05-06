import React, { Component } from 'react';

export default class StepTwo extends Component {
 
  render() {
    return (
      <div className="form-blk">
        <div className="form-row">
          <label>Select provider:</label>
          <select name="provider" value={this.props.providerName} onChange={this.props.handleChangeProvider} >
            <option value="">Provider</option>
            {this.props.providers.map((provider, idx) => <option key={idx} value={provider.id}>{provider.name}</option>)}
           </select>
        </div>
      </div>
    )
  }
}
