import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from 'react-bootstrap/Button';
import TaskService from '../services/TaskService';
import LoginService from '../services/LoginService';
import { updateLogin, setUserLogin, setTasksList, setTodaysTasksList, setFinishedTasksList, setUnfinishedTasksList, setDay } from '../actions';
import '../styles/login.css';

class Login extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            showPassword: false,
            password: '',
            login: '',
        }

        this.loginService = new LoginService();
    }

    showPassword = (bool) => {
        this.setState({ showPassword: !bool });
    }

    login = (login, password) => {
        const { dispatch } = this.props;
        this.loginService.getUserId(login, password).then((data) => {
            console.log(data);
            if (data === "error") {
                console.log("cant login");
            } else {
                dispatch(updateLogin(true));
                dispatch(setUserLogin(data));
                this.taskService = new TaskService();
                this.taskService.getTasks(data).then((list) => {
                    //total list
                    dispatch(setTasksList(list));
                    // set day
                    let day = (new Date()).getDay();
                    if(day === 0) day = 6;
                    else day -= 1;
                    dispatch(setDay(day));
                    //set todays list
                    const todaysList = [];
                    list.forEach(element => {
                        if (element.days[day]) todaysList.push(element);
                    });
                    dispatch(setTodaysTasksList(todaysList));
                    // havent done anything
                    dispatch(setUnfinishedTasksList(todaysList));
                    dispatch(setFinishedTasksList([]));
                    window.location.reload();
                });
            }
        });
    }

    handleLoginChange = (event) => {
        this.setState({ login: event.target.value });
    }

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    render() {
        const { showPassword, password, login } = this.state;
        return (
            <div className='login-body'>
                <h1 className='login-title'>Workout Record<br/>(need logo)</h1>
                <div className='login-input'>
                <Form.Control className='login-input-login' type="text" placeholder="Enter login" onChange={this.handleLoginChange} />
                <InputGroup>
                    <Form.Control type={showPassword ? 'text' : 'password'} placeholder="Password" onChange={this.handlePasswordChange} />
                    <InputGroup.Append>
                        <InputGroup.Text id="basic-addon2" onClick={()=>{ this.showPassword(showPassword)}} >{showPassword ? <Visibility /> : <VisibilityOff />}</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                <a className="login-input-forgot-password" href='https://github.com/Gincral'>Forgot Password?</a><br/>
                <Button className="login-submit-btn" color="primary" onClick={() => { this.login(login, password) }}>Log In</Button>
                </div>
                <hr />
                <div className="login-sign-up">Dont have an account? <a href='https://github.com/Gincral'>Sign Up</a>.</div>

            </div>
        )
    }
}


Login.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    userID: state.userID,
});

export default connect(mapStateToProps)(Login);