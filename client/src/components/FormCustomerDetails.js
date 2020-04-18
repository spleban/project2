import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Textfield from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export class FormCustomerDetails extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {
        const { values, handleChange } = this.props;
        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <AppBar title="Enter Customer Details" />
                    <Textfield
                        hintText="Enter Your Occupation"
                        floatingLabelText="Occupation"
                        onChange={handleChange('occupation')}
                        defaultValue={values.occupation} />
                    <br />
                    <Textfield
                        hintText="Enter Your City"
                        floatingLabelText="City"
                        onChange={handleChange('city')}
                        defaultValue={values.city} />
                    <br />
                    <Textfield
                        hintText="Enter Your Bio"
                        floatingLabelText="Bio"
                        onChange={handleChange('bio')}
                        defaultValue={values.bio} />
                    <br />
                    <RaisedButton
                        label="continue"
                        primary={true}
                        style={styles.button}
                        onClick={this.continue} />
                    <RaisedButton
                        label="back"
                        primary={false}
                        style={styles.button}
                        onClick={this.back} />
                </React.Fragment>
            </MuiThemeProvider>
        )
    }
}

const styles = {
    button: {
        margin: 15
    }
}

export default FormCustomerDetails;