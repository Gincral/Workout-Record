import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Calendar from './Calendar';
import Plans from './Plans';
import Task from './Tasks';
import EditPlans from './EditPlans';
import '../styles/App.css'
import { setTasksList, setTodaysTasksList } from '../actions';
import TaskService from '../services/TaskService';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// const some = () => (
//     <div>
//         <Calendar />
//     </div>
// );

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    initialize = () =>{
        const { dispatch } = this.props;
        this.taskService = new TaskService();
        this.taskService.getTasks(process.env.REACT_APP_USER_ID).then(data => {
            dispatch(setTasksList(data));
            dispatch(setTodaysTasksList(data));
        });
    }

    render() {
        this.initialize();
        
        return (
            <div className="app">
                <div className="app-body">
                <BrowserRouter>
                    <Switch>
                        <Route path="/calender" exact component={Calendar} />
                        <Route path="/" exact component={Task} />
                        <Route path="/Plans" exact component={Plans} />
                        <Route path="/Edit-Plans" exact component={EditPlans} />
                    </Switch>
                </BrowserRouter>
                </div>
                <div className='app-nav'><Nav /></div>
            </div>
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(App);