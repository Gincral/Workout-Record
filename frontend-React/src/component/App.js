import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import BrowserHistory from 'react-history';

import Nav from './nav';
import Calendar from './calendar';
import EditPlans from './editPlans';
import Task from './tasks';

import '../styles/app.css'

const some = () => (
    <div>
        <Calendar />
    </div>
);

class App extends React.Component {
    render() {
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
                    <Nav/>
                </div>

            </div>
        );
    }
}

export default App;