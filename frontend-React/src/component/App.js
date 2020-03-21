import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './nav';
import Calendar from './calendar';
import Plans from './Plans';
import Task from './tasks';
import EditPlans from './editPlans';
import '../styles/app.css'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Login from './Login';

// const some = () => (
//     <div>
//         <Calendar />
//     </div>
// );

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { login } = this.props;
        return (
            <div className="app">
                <div className="app-body">
                    
                    <BrowserRouter>
                        {login && <Switch>
                            <Route path="/calender" exact component={Calendar} />
                            <Route path="/" exact component={Task} />
                            <Route path="/plans" exact component={Plans} />
                            <Route path="/edit-plans" exact component={EditPlans} />
                        </Switch>}
                        {!login && <Switch>
                            <Route path="/" exact component={Login} />
                        </Switch>}
                    </BrowserRouter>
                </div>
                {login && <div className='app-nav'><Nav /></div>}
            </div>
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    login: state.login,
});

export default connect(mapStateToProps)(App);