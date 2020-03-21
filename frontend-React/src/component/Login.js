import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import TaskService from '../services/TaskService';
import LoginService from '../services/LoginService';
import { updateLogin, setUserLogin, setTasksList, setTodaysTasksList, setFinishedTasksList, setUnfinishedTasksList } from '../actions';

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
                    dispatch(setTasksList(list));
                    dispatch(setTodaysTasksList(list));
                    dispatch(setUnfinishedTasksList(list));
                    dispatch(setFinishedTasksList([]));
                    window.location.reload();
                });
            }
        });

    }

    initialize = () => {

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
            <div>
                <TextField id="outlined-basic" label="Login" variant="outlined" margin="dense" onChange={this.handleLoginChange} />
                <FormControl margin="dense" variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        onChange={this.handlePasswordChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton aria-label="toggle password visibility"
                                    onClick={() => { this.showPassword(showPassword) }}
                                    edge="end"
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={70}
                    />
                    <a>Forgot Password?</a>
                </FormControl>
                <Button color="primary" variant="contained" onClick={() => { this.login(login, password) }}>Login</Button>
                <Button color="primary" variant="contained" >Sign Up </Button>
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