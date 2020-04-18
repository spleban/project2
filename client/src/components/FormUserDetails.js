import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Textfield from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export class FormUserDetails extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    render() {
        const { values, handleChange } = this.props;
        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <AppBar title="Welcome To Awesome Appointments" />
                    <Textfield
                        hintText="Enter Your First Name"
                        floatingLabelText="First name"
                        onChange={handleChange('firstName')}
                        defaultValue={values.firstName} />
                    <br />
                    <Textfield
                        hintText="Enter Your Last Name"
                        floatingLabelText="Last name"
                        onChange={handleChange('lastName')}
                        defaultValue={values.lastName} />
                    <br />
                    <Textfield
                        hintText="Enter Your Email"
                        floatingLabelText="Email"
                        onChange={handleChange('email')}
                        defaultValue={values.email} />
                    <br />
                    <RaisedButton
                        label="Provider"
                        primary={true}
                        style={styles.button}
                        onClick={this.continue} />
                    <RaisedButton
                        label="Customer"
                        primary={true}
                        style={styles.button}
                        onClick={this.continue} />
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

export default FormUserDetails

