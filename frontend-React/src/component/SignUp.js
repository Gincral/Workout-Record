import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button';
import LoginService from '../services/LoginService';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import history from '../history';
import Dialog from '@material-ui/core/Dialog';
import ButtonM from '@material-ui/core/Button';

class SignUp extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            showPassword: false,
            password: '',
            login: '',
            userName: '',
            open: false,
            showSuccess: false,
            showFailure: false,
        }
        this.loginService = new LoginService();
    }

    showPassword = (bool) => {
        this.setState({ showPassword: !bool });
    }

    handleLoginChange = (event) => {
        this.setState({ login: event.target.value });
    }

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    handleUserNameChange = (event) => {
        this.setState({ userName: event.target.value });
    }

    closeDialog = () =>{
        this.setState({ open: false });
    }

    createAccount = () => {
        const { userName, password, login } = this.state;
        this.loginService.signUp(password, login, userName).then((res) => {
            this.setState({ open: true });
            if (res._id) {
                this.setState({showSuccess: true});
            } else {
                this.setState({showFailure: true});
            }
        });
    }

    cancel = () => {
        history.push("/");
        window.location.reload();
    }

    render() {
        const { showPassword, open, showSuccess, showFailure } = this.state
        return (
            <div>
                <div className='signUp-body'>
                    <Form.Control className='login-input-login' type="text" placeholder="Login" onChange={this.handleLoginChange} />
                    <Form.Control className='login-input-login' type="text" placeholder="User Name" onChange={this.handleUserNameChange} />
                    <InputGroup>
                        <Form.Control type={showPassword ? 'text' : 'password'} placeholder="Password" onChange={this.handlePasswordChange} />
                        <InputGroup.Append>
                            <InputGroup.Text id="basic-addon2" onClick={() => { this.showPassword(showPassword) }} >{showPassword ? <Visibility /> : <VisibilityOff />}</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>

                    <Button className="login-submit-btn" color="primary" onClick={this.createAccount}>Create Account</Button>
                    <Button className="login-submit-btn" color="primary" onClick={this.cancel} >Cancel</Button>
                </div>
                {showSuccess && <Dialog onClose={this.closeDialog} aria-labelledby="simple-dialog-title" open={open}>
                    <div>Sign Up Successful!</div>
                    <ButtonM className="login-submit-btn" color="primary" onClick={()=>{this.cancel(); this.setState({showSuccess: false});}}>OK</ButtonM>
                </Dialog>}
                {showFailure && <Dialog onClose={this.closeDialog} aria-labelledby="simple-dialog-title" open={open}>
                    <div>Sign Up Failed!</div>
                    <ButtonM className="login-submit-btn" color="primary" onClick={()=>{this.closeDialog(); this.setState({showFailure: false});}}>OK</ButtonM>
                </Dialog>}
            </div>
        )
    }
}


SignUp.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(SignUp);