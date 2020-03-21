import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import '../styles/Tasks.css';
import { setFinishedTasksList, selectingTask, updateLogin, setUnfinishedTasksList } from '../actions';
import { Button } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
class Task extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            array1: this.props.unfinishedTasksList,
            array2: this.props.finishedTasksList,
        }
    }

    setUp = () => {
        const { todaysTasksList } = this.props;
        this.setState({ array1: todaysTasksList });
        this.setState({ array2: [] });
    }

    generateTime = () => {
        const DATE = new Date();
        let day;
        switch (DATE.getDay()) {
            case 1:
                day = "monday";
                break;
            case 2:
                day = "tuesday";
                break;
            case 3:
                day = "wednesday";
                break;
            case 4:
                day = "thursday";
                break;
            case 5:
                day = "friday";
                break;
            case 6:
                day = "saturday";
                break;
            case 7:
                day = "sunday";
                break;
        }
        let month;
        switch (DATE.getMonth() + 1) {
            case 1:
                month = "January";
                break;
            case 2:
                month = "February";
                break;
            case 3:
                month = "March";
                break;
            case 4:
                month = "April";
                break;
            case 5:
                month = "May";
                break;
            case 6:
                month = "June";
                break;
            case 7:
                month = "July";
                break;
            case 8:
                month = "August";
                break;
            case 9:
                month = "September";
                break;
            case 10:
                month = "October";
                break;
            case 11:
                month = "November";
                break;
            case 12:
                month = "December";
                break;
        }
        const date = month + " " + DATE.getDate() + ", " + DATE.getFullYear();
        return [day.toLocaleUpperCase(), date];

    }

    finishTask = (task) => {
        const { dispatch } = this.props;
        const { array1, array2 } = this.state;
        for (let i = 0; i < array1.length; i++) {
            if (task._id === array1[i]._id) {
                array2.push(task)
                this.setState({ array2: array2 });
                array1.splice(i, 1);
                this.setState({ array1: array1 });
                dispatch(setFinishedTasksList(array2));
                dispatch(setUnfinishedTasksList(array1));
                return;
            }
        }
    }

    undoTask = (task) => {
        const { dispatch } = this.props;
        const { array1, array2 } = this.state;
        for (let i = 0; i < array2.length; i++) {
            if (task._id === array2[i]._id) {
                array1.push(task)
                this.setState({ array1: array1 });
                array2.splice(i, 1);
                this.setState({ array2: array2 });
                dispatch(setFinishedTasksList(array2));
                dispatch(setUnfinishedTasksList(array1));
                return;
            }
        }
    }

    logout = () =>{
        this.props.dispatch(updateLogin(false));
        localStorage.clear();
    }

    render() {
        const { array1, array2 } = this.state;
        const data = this.generateTime();
        return (
            <div>
                <Button color="primary" onClick={this.logout}>Logout</Button><br />
                <a className="task-day">{data[0]}</a><br />
                <a className="task-date">{data[1]}</a>
                <br /><br /><a>tasks for today</a>
                <hr />
                {array1.map(task => (
                    <Card className="tasks-card" onClick={() => { this.finishTask(task) }} key={task._id}>
                        <CardContent>
                            <Typography variant="h5" component="h2"> {task.name} </Typography>
                            <Typography color="textSecondary"> {task.description} </Typography>
                        </CardContent>
                    </Card>))}
                <br /><a>tasks done</a>
                <hr />
                {array2.map(task => (
                    <Card className="tasks-card" onClick={() => { this.undoTask(task) }} key={task._id}>
                        <CardContent>
                            <Typography variant="h5" component="h2"> {task.name} </Typography>
                            <Typography color="textSecondary"> {task.description} </Typography>
                        </CardContent>
                    </Card>))}
            </div>
        );
    }
}

Task.propTypes = {
    dispatch: PropTypes.func.isRequired,
    // unfinishedTasksList: PropTypes.array.isRequired,
    unfinishedTasksList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
    selectedTask: state.selectedTask,
    unfinishedTasksList: state.unfinishedTasksList,
    finishedTasksList: state.finishedTasksList,
    todaysTasksList: state.todaysTasksList,
});

export default connect(mapStateToProps)(Task);