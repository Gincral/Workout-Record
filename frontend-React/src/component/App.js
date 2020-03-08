import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import BrowserHistory from 'react-history';
import Nav from './Nav';
import Calendar from './Calendar';
import EditPlans from './EditPlans';
import Task from './Tasks';
import '../styles/App.css'
import { setTasksList } from '../actions';
import TaskService from '../services/TaskService';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const some = () => (
    <div>
        <Calendar />
    </div>
);




class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { dispatch } = this.props;
        this.taskService = new TaskService();
        this.taskService.getTasks('').then(data => {
            dispatch(setTasksList(data));
        });
        
        return (
            <div className="app">
                <BrowserRouter>
                    {/*history={BrowserHistory} */}
                    <Switch>
                        <Route path="/calender" exact component={Calendar} />
                        <Route path="/" exact component={Task} />
                        <Route path="/editPlans" exact component={EditPlans} />
                    </Switch>
                </BrowserRouter>
                <div className='app-nav'>
                    <Nav />
                </div>

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