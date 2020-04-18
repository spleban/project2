import React, { Component } from 'react';
import FormUserDetails from './FormUserDetails';
import FormProviderDetails from './FormProviderDetails';
import FormCustomerDetails from './FormCustomerDetails';
import Confirm from './Confirm';
import Success from './Success'

export class Userform extends Component {
    state = {
        step: 1,
        firstName: '',
        lastName: '',
        email: '',
        city: '',
        bio: '',
    }

    // proceed to the next step
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    }

    // go back to previous step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    }

    // handle fields change
    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    }

    render() {
        const { step } = this.state;
        const { firstName, lastName, email, occupation, city, bio } = this.state;
        const values = { firstName, lastName, email, occupation, city, bio }

        switch (step) {
            case 1:
                return (
                    <FormUserDetails
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values} />
                );
            case 2:
                return (
                    <FormProviderDetails
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values} />
                );
            case 3:
                return (
                    <FormCustomerDetails
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values} />
                );
            case 4:
                return (
                    <Confirm
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        values={values} />
                );
            case 5:
                return <Success />;
        }
    }
}

export default Userform
